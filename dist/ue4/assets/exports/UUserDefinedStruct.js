"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUserDefinedStruct = exports.EUserDefinedStructureStatus = void 0;
const UScriptStruct_1 = require("./UScriptStruct");
const EObjectFlags_1 = require("../../objects/uobject/EObjectFlags");
const UnversionedPropertySerialization_1 = require("../../objects/uobject/serialization/UnversionedPropertySerialization");
const UObject_1 = require("./UObject");
/**
 * EUserDefinedStructureStatus
 * @enum
 */
var EUserDefinedStructureStatus;
(function (EUserDefinedStructureStatus) {
    /** Struct is in an unknown state. */
    EUserDefinedStructureStatus[EUserDefinedStructureStatus["UDSS_UpToDate"] = 0] = "UDSS_UpToDate";
    /** Struct has been modified but not recompiled. */
    EUserDefinedStructureStatus[EUserDefinedStructureStatus["UDSS_Dirty"] = 1] = "UDSS_Dirty";
    /** Struct tried but failed to be compiled. */
    EUserDefinedStructureStatus[EUserDefinedStructureStatus["UDSS_Error"] = 2] = "UDSS_Error";
    /** Struct is a duplicate, the original one was changed. */
    EUserDefinedStructureStatus[EUserDefinedStructureStatus["UDSS_Duplicate"] = 3] = "UDSS_Duplicate";
})(EUserDefinedStructureStatus = exports.EUserDefinedStructureStatus || (exports.EUserDefinedStructureStatus = {}));
/**
 * UUserDefinedStruct
 * @extends {UScriptStruct}
 */
class UUserDefinedStruct extends UScriptStruct_1.UScriptStruct {
    constructor() {
        super(...arguments);
        /**
         * Status
         * @type {EUserDefinedStructureStatus}
         * @public
         */
        this.Status = EUserDefinedStructureStatus.UDSS_UpToDate;
        /**
         * Guid
         * @type {FGuid}
         * @public
         */
        this.Guid = null;
    }
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        if (this.hasAnyFlags(EObjectFlags_1.EObjectFlags.RF_ClassDefaultObject))
            return;
        if (false && this.Status === EUserDefinedStructureStatus.UDSS_UpToDate) {
            // UScriptStruct::SerializeItem
            const defaultProperties = []; // TODO should we save this?
            if (Ar.useUnversionedPropertySerialization) {
                UnversionedPropertySerialization_1.deserializeUnversionedProperties(defaultProperties, this, Ar);
            }
            else {
                UObject_1.deserializeVersionedTaggedProperties(defaultProperties, Ar);
            }
        }
    }
}
exports.UUserDefinedStruct = UUserDefinedStruct;
