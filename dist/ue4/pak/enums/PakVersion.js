"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPakVersion = void 0;
/**
 * EPakVersion
 * @enum
 */
var EPakVersion;
(function (EPakVersion) {
    EPakVersion[EPakVersion["PakVersion_Initial"] = 1] = "PakVersion_Initial";
    EPakVersion[EPakVersion["PakVersion_NoTimestamps"] = 2] = "PakVersion_NoTimestamps";
    EPakVersion[EPakVersion["PakVersion_CompressionEncryption"] = 3] = "PakVersion_CompressionEncryption";
    EPakVersion[EPakVersion["PakVersion_IndexEncryption"] = 4] = "PakVersion_IndexEncryption";
    EPakVersion[EPakVersion["PakVersion_RelativeChunkOffsets"] = 5] = "PakVersion_RelativeChunkOffsets";
    EPakVersion[EPakVersion["PakVersion_DeleteRecords"] = 6] = "PakVersion_DeleteRecords";
    EPakVersion[EPakVersion["PakVersion_EncryptionKeyGuid"] = 7] = "PakVersion_EncryptionKeyGuid";
    EPakVersion[EPakVersion["PakVersion_FNameBasedCompressionMethod"] = 8] = "PakVersion_FNameBasedCompressionMethod";
    EPakVersion[EPakVersion["PakVersion_FrozenIndex"] = 9] = "PakVersion_FrozenIndex";
    EPakVersion[EPakVersion["PakVersion_PathHashIndex"] = 10] = "PakVersion_PathHashIndex";
    EPakVersion[EPakVersion["PakVersion_Fnv64BugFix"] = 11] = "PakVersion_Fnv64BugFix";
    EPakVersion[EPakVersion["PakVersion_Last"] = 12] = "PakVersion_Last";
    EPakVersion[EPakVersion["PakVersion_Latest"] = 11] = "PakVersion_Latest";
})(EPakVersion = exports.EPakVersion || (exports.EPakVersion = {}));
