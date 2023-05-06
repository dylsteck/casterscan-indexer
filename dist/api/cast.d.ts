import { MergeMessageHubEvent } from '../types';
import { Cast } from '../types/db';
/**
 * Insert a new cast in the database
 * @param msg Hub event in JSON format
 */
export declare function insertCast(msg: MergeMessageHubEvent): Promise<void>;
/**
 * Upsert a list of casts in the database
 * @param casts List of casts
 */
export declare function upsertCasts(casts: Cast[]): Promise<void>;
/**
 * Update a cast in the database
 * @param hash Hash of the cast
 * @param change Object with the fields to update
 */
export declare function updateCast(_hash: string, change: {
    deleted?: boolean;
    pruned?: boolean;
}): Promise<void>;
