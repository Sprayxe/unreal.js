/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "../../reader/FArchive";
export declare class AkEntry {
    readonly nameHash: number;
    readonly offsetMultiplier: number;
    readonly size: number;
    readonly offset: number;
    readonly folderId: number;
    path: string;
    isSoundBank: boolean;
    data: Buffer;
    constructor(Ar: FArchive);
    toJson(): {
        nameHash: number;
        offsetMultiplier: number;
        size: number;
        offset: number;
        folderId: number;
        path: string;
        isSoundBank: boolean;
    };
}
