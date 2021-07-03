import { FGuid } from "../../objects/core/misc/Guid";
import { UScriptStruct } from "./UScriptStruct";
import { FAssetArchive } from "../reader/FAssetArchive";
import { EObjectFlags } from "../../objects/uobject/EObjectFlags";
import { FPropertyTag } from "../objects/FPropertyTag";
import { deserializeUnversionedProperties } from "../../objects/uobject/serialization/UnversionedPropertySerialization";
import { deserializeVersionedTaggedProperties } from "./UObject";

/**
 * EUserDefinedStructureStatus
 * @enum
 */
export enum EUserDefinedStructureStatus {
    /** Struct is in an unknown state. */
    UDSS_UpToDate,
    /** Struct has been modified but not recompiled. */
    UDSS_Dirty,
    /** Struct tried but failed to be compiled. */
    UDSS_Error,
    /** Struct is a duplicate, the original one was changed. */
    UDSS_Duplicate
}

/**
 * UUserDefinedStruct
 * @extends {UScriptStruct}
 */
export class UUserDefinedStruct extends UScriptStruct {
    /**
     * Status
     * @type {EUserDefinedStructureStatus}
     * @public
     */
    public Status = EUserDefinedStructureStatus.UDSS_UpToDate

    /**
     * Guid
     * @type {FGuid}
     * @public
     */
    public Guid: FGuid = null

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos);
        if (this.hasAnyFlags(EObjectFlags.RF_ClassDefaultObject))
            return
        if (false && this.Status === EUserDefinedStructureStatus.UDSS_UpToDate) {
            // UScriptStruct::SerializeItem
            const defaultProperties: FPropertyTag[] = [] // TODO should we save this?
            if (Ar.useUnversionedPropertySerialization) {
                deserializeUnversionedProperties(defaultProperties, this, Ar)
            } else {
                deserializeVersionedTaggedProperties(defaultProperties, Ar)
            }
        }
    }
}