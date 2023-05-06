import * as protobufs from '@farcaster/protobufs';
import { FormattedHubEvent } from './types';
export declare const client: import("@farcaster/utils").HubRpcClient;
/**
 * Convert a HubEvent (protobufs) to a more readable format (JSON)
 * @param e HubEvent
 * @returns Hub event in JSON format
 */
export declare function protobufToJson(e: protobufs.HubEvent): FormattedHubEvent;
/**
 * Update the database based on the event type
 * @param event Hub event in JSON format
 */
export declare function handleEvent(event: FormattedHubEvent): Promise<void>;
/**
 * Convert a Base64 or Uint8Array hash to a hex string
 * @param hash Base64 or Uint8Array hash
 * @returns Hex string
 */
export declare function formatHash(hash: string | Uint8Array): string;
/**
 * Listen for new events from a Hub
 */
export declare function watch(): Promise<void>;
