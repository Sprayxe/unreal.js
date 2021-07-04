import { FGuid } from "../../objects/core/misc/Guid";
import { UScriptStruct } from "./UScriptStruct";
import { FAssetArchive } from "../reader/FAssetArchive";
/**
 * EUserDefinedStructureStatus
 * @enum
 */
export declare enum EUserDefinedStructureStatus {
    /** Struct is in an unknown state. */
    UDSS_UpToDate = 0,
    /** Struct has been modified but not recompiled. */
    UDSS_Dirty = 1,
    /** Struct tried but failed to be compiled. */
    UDSS_Error = 2,
    /** Struct is a duplicate, the original one was changed. */
    UDSS_Duplicate = 3
}
/**
 * UUserDefinedStruct
 * @extends {UScriptStruct}
 */
export declare class UUserDefinedStruct extends UScriptStruct {
    /**
     * Status
     * @type {EUserDefinedStructureStatus}
     * @public
     */
    Status: EUserDefinedStructureStatus;
    /**
     * Guid
     * @type {FGuid}
     * @public
     */
    Guid: FGuid;
    deserialize(Ar: FAssetArchive, validPos: number): void;
}
