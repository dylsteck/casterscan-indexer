import * as protobufs from '@farcaster/protobufs';
import 'dotenv/config';
import { upsertCasts, upsertProfiles, upsertReactions, upsertSigners, upsertVerifications, } from '../api/index.js';
import { client } from '../lib.js';
import { breakIntoChunks, formatCasts, formatReactions, formatSigners, formatUserData, formatVerifications, } from '../utils.js';
await seed();
/**
 * Seed the database with data from a hub. This may take a while.
 */
export async function seed() {
    console.log('Seeding database...');
    const startTime = new Date().getTime();
    const allFids = await getAllFids();
    const allVerifications = [];
    const allSigners = [];
    const allProfiles = [];
    for (const fid of allFids) {
        const profile = await getFullProfileFromHub(fid).catch((err) => {
            console.error(`Error getting profile for FID ${fid}`, err);
            return null;
        });
        if (!profile)
            continue;
        allVerifications.push(...profile.verifications);
        allSigners.push(...profile.signers);
        allProfiles.push(profile.userData);
        // Upsert high volume data at 1000 messages at a time
        const chunksOfCasts = breakIntoChunks(profile.casts, 1000);
        for (const chunk of chunksOfCasts) {
            await upsertCasts(chunk);
        }
        const chunksOfReactions = breakIntoChunks(profile.reactions, 1000);
        for (const chunk of chunksOfReactions) {
            await upsertReactions(chunk);
        }
        // Upsert low volume data for 100 profiles at a time
        if (fid % 100 === 0) {
            await upsertVerifications(allVerifications);
            await upsertSigners(allSigners);
            await upsertProfiles(allProfiles);
            allVerifications.length = 0;
            allSigners.length = 0;
            allProfiles.length = 0;
        }
    }
    // Upsert remaining data
    await upsertVerifications(allVerifications);
    await upsertSigners(allSigners);
    await upsertProfiles(allProfiles);
    const endTime = new Date().getTime();
    const elapsedMilliseconds = endTime - startTime;
    const elapsedMinutes = elapsedMilliseconds / 60000;
    console.log(`Done seeding in ${elapsedMinutes} minutes`);
}
/**
 * Index all messages from a profile
 * @param fid Farcaster ID
 */
async function getFullProfileFromHub(_fid) {
    const fid = protobufs.FidRequest.create({ fid: _fid });
    // TODO: add pagination for all of these (mainly casts and reactions)
    const _casts = (await client.getCastsByFid(fid))._unsafeUnwrap();
    const _reactions = (await client.getReactionsByFid(fid))._unsafeUnwrap();
    const _userData = (await client.getUserDataByFid(fid))._unsafeUnwrap();
    const _verifications = (await client.getVerificationsByFid(fid))._unsafeUnwrap();
    const signersResponse = (await client.getSignersByFid(fid))._unsafeUnwrap();
    const casts = hubMessageToJSON(_casts.messages);
    // prettier-ignore
    const reactions = hubMessageToJSON(_reactions.messages);
    // prettier-ignore
    const userData = hubMessageToJSON(_userData.messages);
    // prettier-ignore
    const verifications = hubMessageToJSON(_verifications.messages);
    // prettier-ignore
    const signers = hubMessageToJSON(signersResponse.messages);
    const formattedCasts = formatCasts(casts);
    const formattedReactions = formatReactions(reactions);
    const formattedUserData = formatUserData(userData, _fid);
    const formattedSigners = formatSigners(signers);
    const formattedVerifications = formatVerifications(verifications);
    return {
        casts: formattedCasts,
        reactions: formattedReactions,
        userData: formattedUserData,
        verifications: formattedVerifications,
        signers: formattedSigners,
    };
}
/**
 * Convert Hub messages from protobufs to JSON
 * @param messages List of Hub messages as protobufs
 * @returns List of Hub messages as JSON
 */
function hubMessageToJSON(messages) {
    return messages.map((message) => {
        const json = protobufs.Message.toJSON(message);
        return {
            data: json.data,
            hash: json.hash,
            hashScheme: json.hashScheme,
            signature: json.signature,
            signatureScheme: json.signatureScheme,
            signer: json.signer,
        };
    });
}
/**
 * Get all fids from a hub
 * @returns array of fids
 */
async function getAllFids() {
    const fids = new Array();
    let nextPageToken = undefined;
    let isNextPage = true;
    while (isNextPage) {
        const fidsResult = await client.getFids(protobufs.FidsRequest.create({ pageToken: nextPageToken }));
        if (fidsResult.isErr()) {
            console.error(fidsResult.error);
            break;
        }
        const response = fidsResult.value;
        fids.push(...response.fids);
        nextPageToken = response.nextPageToken;
        isNextPage = !!nextPageToken && nextPageToken.length > 0;
    }
    return fids;
}
