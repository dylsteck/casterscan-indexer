import { MergeMessageHubEvent } from '../types';
import { Signer } from '../types/db';
/**
 * Insert a new signer in the database
 * @param msg Hub event in JSON format
 */
export declare function insertSigner(msg: MergeMessageHubEvent): Promise<void>;
/**
 * Upsert a list of signers in the database
 * @param signers List of signers
 */
export declare function upsertSigners(signers: Signer[]): Promise<void>;
/**
 * Delete a signer from the database
 * @param msg Hub event in JSON format
 */
export declare function deleteSigner(msg: MergeMessageHubEvent): Promise<void>;
/**
 * Delete all messages from a signer from the database
 * @param signer Signer to delete messages from
 */
export declare function deleteMessagesFromSigner(signer: string): Promise<void>;
/**
 * Update a signer in the database
 * @param msg Hub event in JSON format
 * @param change Object with the fields to update
 */
export declare function updateSigner(msg: MergeMessageHubEvent, change: {
    pruned: boolean;
}): Promise<void>;
