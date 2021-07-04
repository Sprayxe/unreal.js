"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FLevelSequenceObjectReferenceMap = exports.FLevelSequenceLegacyObjectReference = void 0;
const Guid_1 = require("../core/misc/Guid");
const FArchive_1 = require("../../reader/FArchive");
/**
 * FLevelSequenceLegacyObjectReference
 * @implements {IStructType}
 */
class FLevelSequenceLegacyObjectReference {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FArchive_1.FArchive) {
            this.keyGuid = new Guid_1.FGuid(x);
            this.objectId = new Guid_1.FGuid(x);
            this.objectPath = x.readString();
        }
        else {
            this.keyGuid = x;
            this.objectId = y;
            this.objectPath = z;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.keyGuid.serialize(Ar);
        this.objectId.serialize(Ar);
        Ar.writeString(this.objectPath);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            keyGuid: this.keyGuid.toJson(),
            objectId: this.objectId.toJson(),
            objectPath: this.objectPath
        };
    }
}
exports.FLevelSequenceLegacyObjectReference = FLevelSequenceLegacyObjectReference;
class FLevelSequenceObjectReferenceMap {
    constructor(arg) {
        this.mapData = arg instanceof FArchive_1.FArchive
            ? arg.readArray(() => new FLevelSequenceLegacyObjectReference(arg))
            : arg;
    }
    serialize(Ar) {
        Ar.writeTArray(this.mapData, (it) => it.serialize(Ar));
    }
    toJson() {
        return this.mapData.map(m => m.toJson());
    }
}
exports.FLevelSequenceObjectReferenceMap = FLevelSequenceObjectReferenceMap;
