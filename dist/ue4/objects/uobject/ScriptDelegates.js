"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FMulticastScriptDelegate = exports.FScriptDelegate = void 0;
const ObjectResource_1 = require("./ObjectResource");
const FAssetArchive_1 = require("../../assets/reader/FAssetArchive");
/**
 * FScriptDelegate
 */
class FScriptDelegate {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            this.object = new ObjectResource_1.FPackageIndex(x);
            this.functionName = x.readFName();
        }
        else {
            this.object = x;
            this.functionName = y;
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        this.object.serialize(Ar);
        Ar.writeFName(this.functionName);
    }
}
exports.FScriptDelegate = FScriptDelegate;
/**
 * FMulticastScriptDelegate
 */
class FMulticastScriptDelegate {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x) {
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            this.invocationList = x.readArray(() => new FScriptDelegate(x));
        }
        else {
            this.invocationList = x;
        }
    }
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeInt32(this.invocationList.length);
        this.invocationList.forEach((it) => it.serialize(Ar));
    }
}
exports.FMulticastScriptDelegate = FMulticastScriptDelegate;
