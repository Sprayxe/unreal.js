"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAssetIdentifier = void 0;
class FAssetIdentifier {
    constructor(Ar) {
        this.packageName = null;
        this.primaryAssetType = null;
        this.objectName = null;
        this.valueName = null;
        const fieldBits = Ar.readInt8();
        if ((fieldBits & (1 << 0)) !== 0)
            this.packageName = Ar.readFName();
        if ((fieldBits & (1 << 1)) !== 0)
            this.primaryAssetType = Ar.readFName();
        if ((fieldBits & (1 << 2)) !== 0)
            this.objectName = Ar.readFName();
        if ((fieldBits & (1 << 3)) !== 0)
            this.valueName = Ar.readFName();
    }
}
exports.FAssetIdentifier = FAssetIdentifier;
