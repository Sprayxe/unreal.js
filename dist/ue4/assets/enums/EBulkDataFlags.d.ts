/**
 * EBulkDataFlags
 * @enum
 */
export declare enum EBulkDataFlags {
    /** Empty flag set. */
    BULKDATA_None = 0,
    /** If set, payload is stored at the end of the file and not inline. */
    BULKDATA_PayloadAtEndOfFile = 1,
    /** If set, payload should be [un]compressed using ZLIB during serialization. */
    BULKDATA_SerializeCompressedZLIB = 2,
    /** Force usage of SerializeElement over bulk serialization. */
    BULKDATA_ForceSingleElementSerialization = 4,
    /** Bulk data is only used once at runtime in the game. */
    BULKDATA_SingleUse = 8,
    /** Bulk data won't be used and doesn't need to be loaded. */
    BULKDATA_Unused = 32,
    /** Forces the payload to be saved inline, regardless of its size. */
    BULKDATA_ForceInlinePayload = 64,
    /** Flag to check if either compression mode is specified. */
    BULKDATA_SerializeCompressed = 2,
    /** Forces the payload to be always streamed, regardless of its size. */
    BULKDATA_ForceStreamPayload = 128,
    /** If set, payload is stored in a .upack file alongside the uasset. */
    BULKDATA_PayloadInSeperateFile = 256,
    /** DEPRECATED: If set, payload is compressed using platform specific bit window. */
    BULKDATA_SerializeCompressedBitWindow = 512,
    /** There is a new default to inline unless you opt out. */
    BULKDATA_Force_NOT_InlinePayload = 1024,
    /** This payload is optional and may not be on device. */
    BULKDATA_OptionalPayload = 2048,
    /** This payload will be memory mapped, this requires alignment, no compression etc. */
    BULKDATA_MemoryMappedPayload = 4096,
    /** Bulk data size is 64 bits long. */
    BULKDATA_Size64Bit = 8192,
    /** Duplicate non-optional payload in optional bulk data. */
    BULKDATA_DuplicateNonOptionalPayload = 16384,
    /** Indicates that an old ID is present in the data, at some point when the DDCs are flushed we can remove this. */
    BULKDATA_BadDataVersion = 32768,
    /** BulkData did not have it's offset changed during the cook and does not need the fix up at load time */
    BULKDATA_NoOffsetFixUp = 65536
}
export declare function EBulkDataFlags_Check(bulkDataFlags1: number | EBulkDataFlags, bulkDataFlags2: number | EBulkDataFlags): boolean;
