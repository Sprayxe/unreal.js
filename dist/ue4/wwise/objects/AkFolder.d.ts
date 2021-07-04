import { AkEntry } from "./AkEntry";
import { FArchive } from "../../reader/FArchive";
export declare class AkFolder {
    readonly offset: number;
    readonly id: number;
    name: string;
    entries: AkEntry[];
    constructor(Ar: FArchive);
    populateName(Ar: FArchive): void;
    toJson(): {
        offset: number;
        id: number;
        name: string;
        entries: {
            nameHash: number;
            offsetMultiplier: number;
            size: number;
            offset: number;
            folderId: number;
            path: string;
            isSoundBank: boolean;
        }[];
    };
}
