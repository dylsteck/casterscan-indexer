import { MergeMessageHubEvent } from './types';
export declare function formatCasts(events: MergeMessageHubEvent[]): {
    hash: string;
    signature: string;
    signer: string;
    text: string;
    fid: number;
    mentions: string;
    parent_fid: number | null;
    parent_hash: string | null;
    thread_hash: null;
    published_at: Date;
}[];
export declare function formatReactions(events: MergeMessageHubEvent[]): {
    fid: number;
    target_cast: string;
    target_fid: number;
    type: string;
    signer: string;
    created_at: Date;
}[];
export declare function formatUserData(events: MergeMessageHubEvent[], fid: number): {
    id: number;
    avatar_url: string | null;
    display_name: string | null;
    bio: string | null;
    url: string | null;
    username: string | null;
    updated_at: Date;
};
export declare function formatVerifications(events: MergeMessageHubEvent[]): {
    fid: number;
    address: string;
    signature: string;
    signer: string;
    created_at: Date;
}[];
export declare function formatSigners(events: MergeMessageHubEvent[]): {
    fid: number;
    signer: string;
    name: string | null;
    created_at: Date;
}[];
export declare function breakIntoChunks(array: any[], size: number): any[][];
