"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EBulkDataFlags_Check = exports.EBulkDataFlags = void 0;
/**
 * EBulkDataFlags
 * @enum
 */
var EBulkDataFlags;
(function (EBulkDataFlags) {
    /** Empty flag set. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_None"] = 0] = "BULKDATA_None";
    /** If set, payload is stored at the end of the file and not inline. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_PayloadAtEndOfFile"] = 1] = "BULKDATA_PayloadAtEndOfFile";
    /** If set, payload should be [un]compressed using ZLIB during serialization. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_SerializeCompressedZLIB"] = 2] = "BULKDATA_SerializeCompressedZLIB";
    /** Force usage of SerializeElement over bulk serialization. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_ForceSingleElementSerialization"] = 4] = "BULKDATA_ForceSingleElementSerialization";
    /** Bulk data is only used once at runtime in the game. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_SingleUse"] = 8] = "BULKDATA_SingleUse";
    /** Bulk data won't be used and doesn't need to be loaded. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_Unused"] = 32] = "BULKDATA_Unused";
    /** Forces the payload to be saved inline, regardless of its size. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_ForceInlinePayload"] = 64] = "BULKDATA_ForceInlinePayload";
    /** Flag to check if either compression mode is specified. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_SerializeCompressed"] = 2] = "BULKDATA_SerializeCompressed";
    /** Forces the payload to be always streamed, regardless of its size. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_ForceStreamPayload"] = 128] = "BULKDATA_ForceStreamPayload";
    /** If set, payload is stored in a .upack file alongside the uasset. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_PayloadInSeperateFile"] = 256] = "BULKDATA_PayloadInSeperateFile";
    /** DEPRECATED: If set, payload is compressed using platform specific bit window. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_SerializeCompressedBitWindow"] = 512] = "BULKDATA_SerializeCompressedBitWindow";
    /** There is a new default to inline unless you opt out. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_Force_NOT_InlinePayload"] = 1024] = "BULKDATA_Force_NOT_InlinePayload";
    /** This payload is optional and may not be on device. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_OptionalPayload"] = 2048] = "BULKDATA_OptionalPayload";
    /** This payload will be memory mapped, this requires alignment, no compression etc. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_MemoryMappedPayload"] = 4096] = "BULKDATA_MemoryMappedPayload";
    /** Bulk data size is 64 bits long. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_Size64Bit"] = 8192] = "BULKDATA_Size64Bit";
    /** Duplicate non-optional payload in optional bulk data. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_DuplicateNonOptionalPayload"] = 16384] = "BULKDATA_DuplicateNonOptionalPayload";
    /** Indicates that an old ID is present in the data, at some point when the DDCs are flushed we can remove this. */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_BadDataVersion"] = 32768] = "BULKDATA_BadDataVersion";
    /** BulkData did not have it's offset changed during the cook and does not need the fix up at load time */
    EBulkDataFlags[EBulkDataFlags["BULKDATA_NoOffsetFixUp"] = 65536] = "BULKDATA_NoOffsetFixUp";
})(EBulkDataFlags = exports.EBulkDataFlags || (exports.EBulkDataFlags = {}));
function EBulkDataFlags_Check(bulkDataFlags1, bulkDataFlags2) {
    return (bulkDataFlags1 & bulkDataFlags2) !== 0;
}
exports.EBulkDataFlags_Check = EBulkDataFlags_Check;
