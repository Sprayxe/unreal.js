import { FName } from "../../objects/uobject/FName";
import { FArchive } from "../../reader/FArchive";
import { FNameEntryId } from "../../objects/uobject/NameTypes";
import { StringBuilder } from "../../../util/StringBuilder";
import { FPartialMapHandle, FStore } from "./AssetDataTagMapSerializationDetails";

export class FAssetRegistryExportPath {
    _class: FName
    _object: FName
    _package: FName

    constructor(_class: FName, _object: FName, _package: FName)
    constructor(Ar: FArchive)
    constructor(x?: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            this._class = x.readFName()
            this._object = x.readFName()
            this._package = x.readFName()
        } else {
            this._class = x
            this._object = y
            this._package = z
        }
    }

    toString(): string
    toString(out: StringBuilder)
    toString(x?: any): string {
        if (!x) {
            const path = new StringBuilder()
            this.toString(path)
            return path.toString()
        } else {
            if (!this._class.isNone()) {
                x.append(`class`).append('\'')
            }
            x.append(`package`)
            if (!this._object.isNone()) {
                x.append('.').append(`object`)
            }
            if (!this._class.isNone()) {
                x.append('\'')
            }
        }
    }

    toName(): FName {
        if (this._class.isNone() && this._object.isNone()) {
            return this._package
        }
        const path = new StringBuilder()
        this.toString(path)
        return FName.dummy(path.toString(), 0)
    }

    isEmpty() {
        return this._class.isNone() && this._package.isNone() && this._object.isNone()
    }
}

const TYPE_BITS = 3
const INDEX_BITS = 32 - TYPE_BITS

export class FValueId {
    type: EValueType
    index: number

    constructor(type: EValueType, index: number)
    constructor(Ar: FArchive)
    constructor(int: number)
    constructor(x?: any, y?: any) {
        if (x && y) {
            this.type = x
            this.type = y
        } else if (x instanceof FArchive) {
            const int = x.readUInt32()
            this.type = EValueType[Object.keys(EValueType)[(int << INDEX_BITS) >> INDEX_BITS]]
            this.index = int >> TYPE_BITS
        } else {
            this.type = EValueType[Object.keys(EValueType)[(x << INDEX_BITS) >> INDEX_BITS]]
            this.index = x >> TYPE_BITS
        }
    }
}

export class FNumberedPair {
    key: FName
    value: FValueId

    constructor(key: FName, value: FValueId)
    constructor(Ar: FArchive)
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.key = x.readFName()
            this.value = new FValueId(x)
        } else {
            this.key = x
            this.value = y
        }
    }
}

export class FNumberlessPair {
    key: FNameEntryId
    value: FValueId

    constructor(key: FNameEntryId, value: FValueId)
    constructor(Ar: FArchive)
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.key = new FNameEntryId(x)
            this.value = new FValueId(x)
        } else {
            this.key = x
            this.value = y
        }
    }
}

export class FNumberlessExportPath {
    _class: FNameEntryId
    _object: FNameEntryId
    _package: FNameEntryId
    _names: string[]

    constructor(_class: FNameEntryId, _object: FNameEntryId, _package: FNameEntryId, _names: string[])
    constructor(Ar: FArchive, names: string[])
    constructor(...params) {
        if (params[0] instanceof FArchive) {
            const Ar = params[0]
            this._class = new FNameEntryId(Ar)
            this._object = new FNameEntryId(Ar)
            this._package = new FNameEntryId(Ar)
            this._names = params[1]
        } else {
            this._class = params[0]
            this._object = params[1]
            this._package = params[2]
            this._names = params[3]
        }
    }

    makeNumberedPath() {
        return new FAssetRegistryExportPath(
            FName.dummy(this._names[this._class.value], 0),
            FName.dummy(this._names[this._object.value], 0),
            FName.dummy(this._names[this._package.value], 0)
        )
    }

    toString()
    toString(out: StringBuilder)
    toString(x?: any) {
        return x ? this.makeNumberedPath().toString(x) : this.makeNumberedPath().toString()
    }

    toName() {
        return this.makeNumberedPath().toName()
    }
}

export class FMapHandle {
    partialHandle: FPartialMapHandle
    store: FStore
    bHasNumberlessKeys: boolean
    num: number
    pairBegin: number

    constructor(partialHandle: FPartialMapHandle, store: FStore) {
        this.partialHandle = partialHandle
        this.store = store
        this.bHasNumberlessKeys = partialHandle.bHasNumberlessKeys
        this.num = partialHandle.num
        this.pairBegin = partialHandle.pairBegin
    }

    getNumberedView(): FNumberedPair[] {
        if (this.bHasNumberlessKeys)
            throw new Error("FMapHandle must not have numberless keys")
        return this.store.pairs.splice(this.pairBegin, (this.pairBegin + this.num))
    }

    getNumberlessView(): FNumberlessPair[] {
        if (this.bHasNumberlessKeys)
            throw new Error("FMapHandle must not have numberless keys")
        return this.store.numberlessPairs.splice(this.pairBegin, (this.pairBegin + this.num))
    }

    forEachPair(fn: (FNumberedPair) => void) {
        if (this.bHasNumberlessKeys) {
            this.getNumberlessView().forEach((it) => {
                fn(new FNumberedPair(FName.createFromDisplayId(this.store.nameMap[it.key.value], 0), it.value))
            })
        } else {
            this.getNumberedView().forEach(fn)
        }
    }
}

export enum EValueType {
    AnsiString = "AnsiString",
    WideString = "WideString",
    NumberlessName = "NumberlessName",
    Name = "Name",
    NumberlessExportPath = "NumberlessExportPath",
    ExportPath = "ExportPath",
    LocalizedText = "LocalizedText"
}