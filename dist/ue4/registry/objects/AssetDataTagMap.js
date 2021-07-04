"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EValueType = exports.FMapHandle = exports.FNumberlessExportPath = exports.FNumberlessPair = exports.FNumberedPair = exports.FValueId = exports.FAssetRegistryExportPath = void 0;
const FName_1 = require("../../objects/uobject/FName");
const FArchive_1 = require("../../reader/FArchive");
const NameTypes_1 = require("../../objects/uobject/NameTypes");
const StringBuilder_1 = require("../../../util/StringBuilder");
class FAssetRegistryExportPath {
    constructor(x, y, z) {
        if (x instanceof FArchive_1.FArchive) {
            this._class = x.readFName();
            this._object = x.readFName();
            this._package = x.readFName();
        }
        else {
            this._class = x;
            this._object = y;
            this._package = z;
        }
    }
    toString(x) {
        if (!x) {
            const path = new StringBuilder_1.StringBuilder();
            this.toString(path);
            return path.toString();
        }
        else {
            if (!this._class.isNone()) {
                x.append(`class`).append('\'');
            }
            x.append(`package`);
            if (!this._object.isNone()) {
                x.append('.').append(`object`);
            }
            if (!this._class.isNone()) {
                x.append('\'');
            }
        }
    }
    toName() {
        if (this._class.isNone() && this._object.isNone()) {
            return this._package;
        }
        const path = new StringBuilder_1.StringBuilder();
        this.toString(path);
        return FName_1.FName.dummy(path.toString(), 0);
    }
    isEmpty() {
        return this._class.isNone() && this._package.isNone() && this._object.isNone();
    }
}
exports.FAssetRegistryExportPath = FAssetRegistryExportPath;
const TYPE_BITS = 3;
const INDEX_BITS = 32 - TYPE_BITS;
class FValueId {
    constructor(x, y) {
        if (x && y) {
            this.type = x;
            this.type = y;
        }
        else if (x instanceof FArchive_1.FArchive) {
            const int = x.readUInt32();
            this.type = EValueType[Object.keys(EValueType)[(int << INDEX_BITS) >> INDEX_BITS]];
            this.index = int >> TYPE_BITS;
        }
        else {
            this.type = EValueType[Object.keys(EValueType)[(x << INDEX_BITS) >> INDEX_BITS]];
            this.index = x >> TYPE_BITS;
        }
    }
}
exports.FValueId = FValueId;
class FNumberedPair {
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.key = x.readFName();
            this.value = new FValueId(x);
        }
        else {
            this.key = x;
            this.value = y;
        }
    }
}
exports.FNumberedPair = FNumberedPair;
class FNumberlessPair {
    constructor(x, y) {
        if (x instanceof FArchive_1.FArchive) {
            this.key = new NameTypes_1.FNameEntryId(x);
            this.value = new FValueId(x);
        }
        else {
            this.key = x;
            this.value = y;
        }
    }
}
exports.FNumberlessPair = FNumberlessPair;
class FNumberlessExportPath {
    constructor(...params) {
        if (params[0] instanceof FArchive_1.FArchive) {
            const Ar = params[0];
            this._class = new NameTypes_1.FNameEntryId(Ar);
            this._object = new NameTypes_1.FNameEntryId(Ar);
            this._package = new NameTypes_1.FNameEntryId(Ar);
            this._names = params[1];
        }
        else {
            this._class = params[0];
            this._object = params[1];
            this._package = params[2];
            this._names = params[3];
        }
    }
    makeNumberedPath() {
        return new FAssetRegistryExportPath(FName_1.FName.dummy(this._names[this._class.value], 0), FName_1.FName.dummy(this._names[this._object.value], 0), FName_1.FName.dummy(this._names[this._package.value], 0));
    }
    toString(x) {
        return x ? this.makeNumberedPath().toString(x) : this.makeNumberedPath().toString();
    }
    toName() {
        return this.makeNumberedPath().toName();
    }
}
exports.FNumberlessExportPath = FNumberlessExportPath;
class FMapHandle {
    constructor(partialHandle, store) {
        this.partialHandle = partialHandle;
        this.store = store;
        this.bHasNumberlessKeys = partialHandle.bHasNumberlessKeys;
        this.num = partialHandle.num;
        this.pairBegin = partialHandle.pairBegin;
    }
    getNumberedView() {
        if (this.bHasNumberlessKeys)
            throw new Error("FMapHandle must not have numberless keys");
        return this.store.pairs.splice(this.pairBegin, (this.pairBegin + this.num));
    }
    getNumberlessView() {
        if (this.bHasNumberlessKeys)
            throw new Error("FMapHandle must not have numberless keys");
        return this.store.numberlessPairs.splice(this.pairBegin, (this.pairBegin + this.num));
    }
    forEachPair(fn) {
        if (this.bHasNumberlessKeys) {
            this.getNumberlessView().forEach((it) => {
                fn(new FNumberedPair(FName_1.FName.createFromDisplayId(this.store.nameMap[it.key.value], 0), it.value));
            });
        }
        else {
            this.getNumberedView().forEach(fn);
        }
    }
}
exports.FMapHandle = FMapHandle;
var EValueType;
(function (EValueType) {
    EValueType["AnsiString"] = "AnsiString";
    EValueType["WideString"] = "WideString";
    EValueType["NumberlessName"] = "NumberlessName";
    EValueType["Name"] = "Name";
    EValueType["NumberlessExportPath"] = "NumberlessExportPath";
    EValueType["ExportPath"] = "ExportPath";
    EValueType["LocalizedText"] = "LocalizedText";
})(EValueType = exports.EValueType || (exports.EValueType = {}));
