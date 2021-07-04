/**
 * EPakVersion
 * @enum
 */
export declare enum EPakVersion {
    PakVersion_Initial = 1,
    PakVersion_NoTimestamps = 2,
    PakVersion_CompressionEncryption = 3,
    PakVersion_IndexEncryption = 4,
    PakVersion_RelativeChunkOffsets = 5,
    PakVersion_DeleteRecords = 6,
    PakVersion_EncryptionKeyGuid = 7,
    PakVersion_FNameBasedCompressionMethod = 8,
    PakVersion_FrozenIndex = 9,
    PakVersion_PathHashIndex = 10,
    PakVersion_Fnv64BugFix = 11,
    PakVersion_Last = 12,
    PakVersion_Latest = 11
}
