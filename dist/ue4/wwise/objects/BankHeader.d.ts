import { FArchive } from "../../reader/FArchive";
export declare class BankHeader {
    readonly version: number;
    readonly id: number;
    constructor(Ar: FArchive);
}
