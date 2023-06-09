import { db } from '../db.js';
import { formatHash } from '../lib.js';
/**
 * Insert a new profile in the database
 * @param msg ID Registry `Register` contract event
 */
export async function insertProfile(msg) {
    const profile = {
        id: msg.fid,
        owner: formatHash(msg.to),
        registered_at: new Date(),
        updated_at: new Date(),
    };
    try {
        await db
            .insertInto('profile')
            .values(profile)
            .onConflict((oc) => oc.column('id').doNothing())
            .executeTakeFirstOrThrow();
        console.log(`PROFILE INSERTED -- ${msg.fid}`);
    }
    catch (error) {
        console.error('ERROR INSERTING PROFILE', error);
    }
}
/**
 * Upsert a list of profiles in the database
 * @param profiles List of profiles
 */
export async function upsertProfiles(profiles) {
    if (!profiles)
        return;
    try {
        await db
            .insertInto('profile')
            .values(profiles)
            .onConflict((oc) => oc.column('id').doNothing())
            .executeTakeFirstOrThrow();
        console.log(Array.isArray(profiles)
            ? `${profiles.length} USERS DATA UPSERTED`
            : `USER DATA UPSERTED ${profiles.id}`);
    }
    catch (error) {
        console.error('ERROR UPSERTING USER DATA', error);
    }
}
/**
 * Update a profile owner in the database
 * @param msg ID Registry `Transfer` contract event
 */
export async function updateProfileOwner(msg) {
    const profile = {
        id: msg.fid,
        owner: formatHash(msg.to),
        updated_at: new Date(),
    };
    try {
        await db
            .updateTable('profile')
            .set(profile)
            .where('id', '=', msg.fid)
            .executeTakeFirstOrThrow();
        console.log('FID OWNER UPDATED', msg.fid);
    }
    catch (error) {
        console.error('ERROR UPDATING FID OWNER', error);
    }
}
// Handle all types: PFP (1), DISPLAY (2), BIO (3), URL (4), FNAME (5)
const profileTypes = new Map([
    ['USER_DATA_TYPE_PFP', 'avatar_url'],
    ['USER_DATA_TYPE_DISPLAY', 'display_name'],
    ['USER_DATA_TYPE_BIO', 'bio'],
    ['USER_DATA_TYPE_URL', 'url'],
    ['USER_DATA_TYPE_FNAME', 'username'],
]);
/**
 * Update a profile in the database
 * @param msg Hub event in JSON format
 */
export async function updateProfile(msg) {
    const fid = msg.data.fid;
    const type = msg.data.userDataBody.type;
    const key = profileTypes.get(type.toString());
    if (!key) {
        console.error('UNKNOWN_USER_DATA_TYPE', type);
        return;
    }
    const profile = {
        id: fid,
        [key]: msg.data.userDataBody.value,
        updated_at: new Date(),
    };
    try {
        await db
            .updateTable('profile')
            .set(profile)
            .where('id', '=', fid)
            .executeTakeFirstOrThrow();
        console.log(`PROFILE UPDATED -- ${fid}`);
    }
    catch (error) {
        console.error('ERROR UPDATING PROFILE', error);
    }
}
/**
 * Delete part of a profile in the database upon revoking the signer that created it
 * @param msg Hub event in JSON format
 */
export async function deletePartOfProfile(msg) {
    const type = msg.data.userDataBody.type;
    const key = profileTypes.get(type.toString());
    if (!key) {
        console.error('UNKNOWN_USER_DATA_TYPE', type);
        return;
    }
    const profile = {
        id: msg.data.fid,
        [key]: null,
        updated_at: new Date(),
    };
    try {
        await db
            .updateTable('profile')
            .set(profile)
            .where('id', '=', msg.data.fid)
            .executeTakeFirstOrThrow();
        console.log(`PROFILE UPDATED FROM REVOKED SIGNER -- ${msg.data.fid} revoked ${type}`);
    }
    catch (error) {
        console.error('ERROR UPDATING PROFILE', error);
    }
}
