import { Kysely } from 'kysely';
import { Json } from './types/db';
interface CastTable {
    hash: string;
    signature: string;
    signer: string;
    text: string;
    fid: number;
    mentions: Json | null;
    parent_fid: number | null;
    parent_hash: string | null;
    thread_hash: string | null;
    deleted: boolean | null;
    pruned: boolean | null;
    published_at: Date | null;
}
interface EventTable {
    id: number;
    created_at: Date | null;
}
interface ProfileTable {
    id: number;
    owner: string | null;
    username: string | null;
    display_name: string | null;
    bio: string | null;
    url: string | null;
    avatar_url: string | null;
    registered_at: Date | null;
    updated_at: Date | null;
}
interface Reaction {
    fid: number;
    target_cast: string;
    target_fid: number;
    type: string;
    signer: string;
    pruned: boolean | null;
    created_at: Date | null;
}
interface Signer {
    fid: number;
    signer: string;
    name: string | null;
    pruned: boolean | null;
    created_at: Date | null;
}
interface Verification {
    fid: number;
    address: string;
    signer: string;
    signature: string;
    pruned: boolean | null;
    created_at: Date | null;
}
interface Database {
    casts: CastTable;
    event: EventTable;
    profile: ProfileTable;
    reaction: Reaction;
    signer: Signer;
    verification: Verification;
}
export declare const db: Kysely<Database>;
export {};
