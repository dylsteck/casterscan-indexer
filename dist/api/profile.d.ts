import * as protobufs from '@farcaster/protobufs';
import { MergeMessageHubEvent } from '../types';
import { Profile } from '../types/db';
/**
 * Insert a new profile in the database
 * @param msg ID Registry `Register` contract event
 */
export declare function insertProfile(msg: protobufs.IdRegistryEvent): Promise<void>;
/**
 * Upsert a list of profiles in the database
 * @param profiles List of profiles
 */
export declare function upsertProfiles(profiles: Profile | Profile[]): Promise<void>;
/**
 * Update a profile owner in the database
 * @param msg ID Registry `Transfer` contract event
 */
export declare function updateProfileOwner(msg: protobufs.IdRegistryEvent): Promise<void>;
/**
 * Update a profile in the database
 * @param msg Hub event in JSON format
 */
export declare function updateProfile(msg: MergeMessageHubEvent): Promise<void>;
/**
 * Delete part of a profile in the database upon revoking the signer that created it
 * @param msg Hub event in JSON format
 */
export declare function deletePartOfProfile(msg: MergeMessageHubEvent): Promise<void>;
