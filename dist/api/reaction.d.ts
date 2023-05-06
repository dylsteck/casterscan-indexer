import { MergeMessageHubEvent } from '../types';
import { Reaction } from '../types/db';
/**
 * Insert a reaction in the database
 * @param msg Hub event in JSON format
 */
export declare function insertReaction(msg: MergeMessageHubEvent): Promise<void>;
/**
 * Upsert a list of reactions in the database
 * @param reactions List of reactions
 */
export declare function upsertReactions(reactions: Reaction[]): Promise<void>;
/**
 * Delete a reaction from the database
 * @param msg Hub event in JSON format
 */
export declare function deleteReaction(msg: MergeMessageHubEvent): Promise<void>;
/**
 * Update a reaction in the database
 * @param msg Hub event in JSON format
 * @param change Object with the fields to update
 */
export declare function updateReaction(msg: MergeMessageHubEvent, change: {
    pruned: boolean;
}): Promise<void>;
