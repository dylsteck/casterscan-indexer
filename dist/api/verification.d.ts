import { MergeMessageHubEvent } from '../types';
import { Verification } from '../types/db';
/**
 * Insert a new verification in the database
 * @param msg Hub event in JSON format
 */
export declare function insertVerification(msg: MergeMessageHubEvent): Promise<void>;
/**
 * Upsert a list of verifications in the database
 * @param verifications List of verifications
 */
export declare function upsertVerifications(verifications: Verification[]): Promise<void>;
/**
 * Delete a verification from the database
 * @param msg Hub event in JSON format
 */
export declare function deleteVerification(msg: MergeMessageHubEvent): Promise<void>;
/**
 * Update a verification in the database
 * @param msg Hub event in JSON format
 * @param change Object with the fields to update
 */
export declare function updateVerification(msg: MergeMessageHubEvent, change: {
    pruned: boolean;
}): Promise<void>;
