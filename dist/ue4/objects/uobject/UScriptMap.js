"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UScriptMap = void 0;
const FProperty_1 = require("../../assets/objects/FProperty");
const FAssetArchive_1 = require("../../assets/reader/FAssetArchive");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const UnrealMap_1 = require("../../../util/UnrealMap");
class UScriptMap {
    constructor(x, y) {
        if (x instanceof FAssetArchive_1.FAssetArchive) {
            this.numKeysToRemove = x.readInt32();
            if (this.numKeysToRemove !== 0) {
                let _i = 0;
                while (_i < this.numKeysToRemove) {
                    FProperty_1.FProperty.readPropertyValue(x, y.innerType, FProperty_1.ReadType.MAP);
                    ++_i;
                }
            }
            const length = x.readInt32();
            this.mapData = new UnrealMap_1.UnrealMap();
            let i = 0;
            while (i < length) {
                let isReadingValue = false;
                try {
                    const key = FProperty_1.FProperty.readPropertyValue(x, y.innerType, FProperty_1.ReadType.MAP);
                    isReadingValue = true;
                    const value = FProperty_1.FProperty.readPropertyValue(x, y.valueType, FProperty_1.ReadType.MAP);
                    this.mapData.set(key, value);
                }
                catch (e) {
                    throw new Exceptions_1.ParserException(`Failed to read ${isReadingValue ? "value" : "key"} for index ${i} in map`, x);
                }
                ++i;
            }
        }
        else {
            this.numKeysToRemove = x;
            this.mapData = y;
        }
    }
    serialize(Ar) {
        Ar.writeInt32(this.numKeysToRemove);
        Ar.writeInt32(this.mapData.size);
        this.mapData.forEach((v, k) => {
            FProperty_1.FProperty.writePropertyValue(Ar, k, FProperty_1.ReadType.MAP);
            FProperty_1.FProperty.writePropertyValue(Ar, v, FProperty_1.ReadType.MAP);
        });
    }
}
exports.UScriptMap = UScriptMap;
