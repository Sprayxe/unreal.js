/// <reference types="node" />
/// <reference types="ref-napi" />
import { BankHeader } from "./objects/BankHeader";
import { AkFolder } from "./objects/AkFolder";
import { DataIndex } from "./objects/DataIndex";
import { Hierarchy } from "./objects/Hierarchy";
import Collection from "@discordjs/collection";
import { FArchive } from "../reader/FArchive";
export declare class WwiseReader {
    header: BankHeader;
    folders: AkFolder[];
    initialization: string[];
    wemIndexes: DataIndex[];
    wemSounds: Buffer[];
    hierarchy: Hierarchy[];
    idToString: Collection<number, string>;
    platform: string;
    wwiseEncodedMedias: Collection<string, Buffer>;
    constructor(Ar: FArchive);
    toJson(): {
        header: {
            id: number;
            version: number;
        };
        folders: {
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
        }[];
        initialization: string[];
        wemIndexes: {
            length: number;
            offset: number;
            id: number;
        }[];
        hierarchy: {
            type: string;
            length: number;
            data: any;
        }[];
        idToString: {
            key: number;
            value: string;
        }[];
        platform: string;
    };
}
