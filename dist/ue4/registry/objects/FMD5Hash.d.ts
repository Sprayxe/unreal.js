/// <reference types="node" />
/// <reference types="ref-napi" />
import { FArchive } from "../../reader/FArchive";
export declare class FMD5Hash {
    hash?: Buffer;
    constructor(Ar: FArchive);
}
