"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FValueHandle = exports.FPartialMapHandle = exports.ELoadOrder = exports.FStore = exports.END_MAGIC = exports.BEGIN_MAGIC = exports.OLD_BEGIN_MAGIC = void 0;
const AssetDataTagMap_1 = require("./AssetDataTagMap");
const NameTypes_1 = require("../../objects/uobject/NameTypes");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const UnrealArray_1 = require("../../../util/UnrealArray");
exports.OLD_BEGIN_MAGIC = 0x12345678;
exports.BEGIN_MAGIC = 0x12345679;
exports.END_MAGIC = 0x87654321;
/** Stores a fixed set of values and all the key-values maps used for lookup */
class FStore {
    constructor(Ar) {
        this.texts = []; // FText objects serialized in NSLOCTEXT() strings
        this.Ar = Ar;
        this.nameMap = this.Ar.names;
        // init
        const initialMagic = Ar.readUInt32();
        const order = this.getLoadOrder(initialMagic);
        if (!order)
            throw new Exceptions_1.ParserException("Bad init magic", Ar);
        const nums = new UnrealArray_1.UnrealArray(11, () => Ar.readInt32());
        if (order === ELoadOrder.TextFirst) {
            const textDataBytes = Ar.readUInt32();
            this.texts = new UnrealArray_1.UnrealArray(nums[4], () => Ar.readString());
        }
        this.numberlessNames = new UnrealArray_1.UnrealArray(nums[0], () => new NameTypes_1.FNameEntryId(Ar));
        this.names = new UnrealArray_1.UnrealArray(nums[1], () => Ar.readFName());
        this.numberlessExportPaths = new UnrealArray_1.UnrealArray(nums[2], () => new AssetDataTagMap_1.FNumberlessExportPath(Ar, this.nameMap));
        this.exportPaths = new UnrealArray_1.UnrealArray(nums[3], () => new AssetDataTagMap_1.FAssetRegistryExportPath(Ar));
        if (order === ELoadOrder.Member) {
            this.texts = new UnrealArray_1.UnrealArray(nums[4], () => Ar.readString());
        }
        this.ansiStringOffsets = new UnrealArray_1.UnrealArray(nums[5], () => Ar.readUInt32());
        this.wideStringOffsets = new UnrealArray_1.UnrealArray(nums[6], () => Ar.readUInt32());
        this.ansiStrings = Ar.readBuffer(nums[7]);
        this.wideStrings = Ar.wrappedAr.readBuffer(nums[8] * 2);
        this.numberlessPairs = new UnrealArray_1.UnrealArray(nums[9], () => new AssetDataTagMap_1.FNumberlessPair(Ar));
        this.pairs = new UnrealArray_1.UnrealArray(nums[10], () => new AssetDataTagMap_1.FNumberedPair(Ar));
        if (Ar.readUInt32() !== exports.END_MAGIC)
            throw new Error("Bytes did not match 'END_MAGIC' at end");
    }
    getLoadOrder(initialMagic) {
        return initialMagic === exports.OLD_BEGIN_MAGIC ? ELoadOrder.Member :
            initialMagic === exports.BEGIN_MAGIC ? ELoadOrder.TextFirst :
                null;
    }
    getAnsiString(idx) {
        const offset = this.ansiStringOffsets[idx];
        let length = 0;
        while (this.ansiStrings[offset + length] !== 0)
            ++length;
        return Buffer.from(this.ansiStrings, offset, length).toString("utf-8");
    }
    getWideString(idx) {
        const offset = this.wideStringOffsets[idx];
        var length = 0;
        while (this.wideStrings[offset + length] !== 0 && this.wideStrings[offset + length + 1] !== 0)
            length += 2;
        return Buffer.from(this.wideStrings, offset, length).toString("utf16le");
    }
}
exports.FStore = FStore;
var ELoadOrder;
(function (ELoadOrder) {
    ELoadOrder["Member"] = "Member";
    ELoadOrder["TextFirst"] = "TextFirst";
})(ELoadOrder = exports.ELoadOrder || (exports.ELoadOrder = {}));
class FPartialMapHandle {
    constructor(int) {
        this.int = int;
        this.bHasNumberlessKeys = int >> 63 > 0;
        this.num = int >> 32;
        this.pairBegin = int;
    }
    makeFullHandle(store) {
        return new AssetDataTagMap_1.FMapHandle(this, store);
    }
    toInt() {
        return ((this.bHasNumberlessKeys ? 1 : 0) << 63) | (this.num << 32) | this.pairBegin;
    }
}
exports.FPartialMapHandle = FPartialMapHandle;
class FValueHandle {
    constructor(store, id) {
        this.store = store;
        this.id = id;
    }
    asString() {
        const index = this.id.index;
        return this.id.type === AssetDataTagMap_1.EValueType.AnsiString ? this.store.getAnsiString(index) :
            this.id.type === AssetDataTagMap_1.EValueType.WideString ? this.store.getWideString(index) :
                this.id.type === AssetDataTagMap_1.EValueType.NumberlessName ? this.store.nameMap[this.store.numberlessNames[index].value] :
                    this.id.type === AssetDataTagMap_1.EValueType.Name ? this.store.names[index].text :
                        this.id.type === AssetDataTagMap_1.EValueType.NumberlessExportPath ? this.store.numberlessExportPaths[index].toString() :
                            this.id.type === AssetDataTagMap_1.EValueType.ExportPath ? this.store.exportPaths[index].toString() :
                                this.id.type === AssetDataTagMap_1.EValueType.LocalizedText ? this.store.texts[index].toString() :
                                    "";
    }
}
exports.FValueHandle = FValueHandle;
