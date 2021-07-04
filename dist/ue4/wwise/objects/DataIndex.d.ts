import { FArchive } from "../../reader/FArchive";
export declare class DataIndex {
    readonly id: number;
    readonly offset: number;
    readonly length: number;
    constructor(Ar: FArchive);
}
