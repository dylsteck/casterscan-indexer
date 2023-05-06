/**
 * Insert an event ID in the database
 * @param eventId Hub event ID
 */
export declare function insertEvent(eventId: number): Promise<void>;
/**
 * Get the latest event ID from the database
 * @returns Latest event ID
 */
export declare function getLatestEvent(): Promise<number | undefined>;
