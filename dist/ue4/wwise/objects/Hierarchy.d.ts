import { EHierarchyObjectType } from "../enums/EHierarchyObjectType";
import { AbstractHierarchy } from "./AbstractHierarchy";
import { FArchive } from "../../reader/FArchive";
export declare class Hierarchy {
    readonly type: EHierarchyObjectType;
    readonly length: number;
    readonly data: AbstractHierarchy;
    constructor(Ar: FArchive);
    toJson(): {
        type: string;
        length: number;
        data: any;
    };
}
