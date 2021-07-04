"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAssetData = void 0;
const UnrealMap_1 = require("../../../util/UnrealMap");
class FAssetData {
    constructor(Ar) {
        this.tagsAndValues = new UnrealMap_1.UnrealMap();
        // Serialize out the asset info
        this.objectPath = Ar.readFName();
        this.packagePath = Ar.readFName();
        this.assetClass = Ar.readFName();
        // These are derived from ObjectPath, we manually serialize them because they get pooled
        this.packageName = Ar.readFName();
        this.assetName = Ar.readFName();
        Ar.serializeTagsAndBundles(this);
        this.chunkIds = Ar.readArray(() => Ar.readInt32());
        this.packageFlags = Ar.readUInt32();
    }
}
exports.FAssetData = FAssetData;
