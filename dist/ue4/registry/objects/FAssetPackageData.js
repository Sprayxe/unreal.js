"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAssetPackageData = void 0;
const Guid_1 = require("../../objects/core/misc/Guid");
const FMD5Hash_1 = require("./FMD5Hash");
class FAssetPackageData {
    constructor(Ar, serializeHash) {
        this.packageName = Ar.readFName();
        this.diskSize = Number(Ar.readInt64());
        this.packageGuid = new Guid_1.FGuid(Ar);
        this.cookedHash = serializeHash ? new FMD5Hash_1.FMD5Hash(Ar) : null;
    }
}
exports.FAssetPackageData = FAssetPackageData;
