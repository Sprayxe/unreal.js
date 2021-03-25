export enum EPakVersion {
    PakVersion_Initial = 1,
    PakVersion_NoTimestamps = 2,
    PakVersion_CompressionEncryption = 3,          // UE4.3+
    PakVersion_IndexEncryption = 4,                // UE4.17+ - encrypts only pak file index data leaving file content as is
    PakVersion_RelativeChunkOffsets = 5,           // UE4.20+
    PakVersion_DeleteRecords = 6,                  // UE4.21+ - this constant is not used in UE4 code
    PakVersion_EncryptionKeyGuid = 7,              // ... allows to use multiple encryption keys over the single project
    PakVersion_FNameBasedCompressionMethod = 8,    // UE4.22+ - use string instead of enum for compression method
    PakVersion_FrozenIndex = 9,                    // UE4.25 - used only in 4.25, removed with 4.26
    PakVersion_PathHashIndex = 10,                 // UE4.26+ - all file paths are encrypted (stored as 64-bit hash values)
    PakVersion_Fnv64BugFix = 11,

    PakVersion_Last = 12,
    PakVersion_Latest = PakVersion_Last - 1
}