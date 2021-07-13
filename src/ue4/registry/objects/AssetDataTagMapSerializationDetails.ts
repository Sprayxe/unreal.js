import {
    EValueType,
    FAssetRegistryExportPath,
    FMapHandle,
    FNumberedPair,
    FNumberlessExportPath,
    FNumberlessPair, FValueId
} from "./AssetDataTagMap";
import { FName } from "../../objects/uobject/FName";
import { FNameEntryId } from "../../objects/uobject/NameTypes";
import { FAssetRegistryReader } from "../reader/AssetRegistryArchive";
import { ParserException } from "../../../exceptions/Exceptions";
import { Utils } from "../../../util/Utils";

export const OLD_BEGIN_MAGIC = 0x12345678
export const BEGIN_MAGIC = 0x12345679
export const END_MAGIC = 0x87654321

/** Stores a fixed set of values and all the key-values maps used for lookup */
export class FStore {
    Ar: FAssetRegistryReader
    constructor(Ar: FAssetRegistryReader) {
        this.Ar = Ar
        this.nameMap = this.Ar.names

        // init
        const initialMagic = Ar.readUInt32()
        const order = this.getLoadOrder(initialMagic)
        if (!order)
            throw new ParserException("Bad init magic", Ar)

        const nums = new Array(11)
        for (let i = 0; i < 11; ++i) {
            nums[i] = Ar.readInt32()
        }

        if (order === ELoadOrder.TextFirst) {
            const textDataBytes = Ar.readUInt32()
            const len = nums[4]
            this.texts = new Array(len)
            for (let i = 0; i < len; ++i) {
                this.texts[i] = Ar.readString()
            }
        }

        const len1 = nums[0]
        this.numberlessNames = new Array(len1)
        for (let i = 0; i < len1; ++i) {
            this.numberlessNames[i] = new FNameEntryId(Ar)
        }

        const len2 = nums[1]
        this.names = new Array(len2)
        for (let i = 0; i < len2; ++i) {
            this.names[i] = Ar.readFName()
        }

        const len3 = nums[2]
        this.numberlessExportPaths = new Array(len3)
        for (let i = 0; i < len3; ++i) {
            this.numberlessExportPaths[i] = new FNumberlessExportPath(Ar, this.nameMap)
        }

        const len4 = nums[3]
        this.exportPaths = new Array(len4)
        for (let i = 0; i < len4; ++i) {
            this.exportPaths[i] = new FAssetRegistryExportPath(Ar)
        }

        if (order === ELoadOrder.Member) {
            const _len = nums[4]
            this.texts = new Array(_len)
            for (let i = 0; i < _len; ++i) {
                this.texts[i] = Ar.readString()
            }
        }

        const len5 = nums[5]
        this.ansiStringOffsets = new Array(len5)
        for (let i = 0; i < len5; ++i) {
            this.ansiStringOffsets[i] = Ar.readUInt32()
        }

        const len6 = nums[6]
        this.wideStringOffsets = new Array(len6)
        for (let i = 0; i < len6; ++i) {
            this.wideStringOffsets[i] = Ar.readUInt32()
        }

        this.ansiStrings = Ar.read(nums[7])
        this.wideStrings = Ar.wrappedAr.read(nums[8] * 2)

        const len7 = nums[9]
        this.numberlessPairs = new Array(len7)
        for (let i = 0; i < len7; ++i) {
            this.numberlessPairs[i] = new FNumberlessPair(Ar)
        }

        const len8 = nums[10]
        this.pairs = new Array(len8)
        for (let i = 0; i < len8; ++i) {
            this.pairs[i] = new FNumberedPair(Ar)
        }

        if (Ar.readUInt32() !== END_MAGIC)
            throw new Error("Bytes did not match 'END_MAGIC' at end")
    }

    // Pairs for all unsorted maps that uses this store
    pairs: FNumberedPair[]
    numberlessPairs: FNumberlessPair[]

    // Values for all maps in this store
    ansiStringOffsets: number[]
    ansiStrings: Buffer
    wideStringOffsets: number[]
    wideStrings: Buffer
    numberlessNames: FNameEntryId[]
    names: FName[]
    numberlessExportPaths: FNumberlessExportPath[]
    exportPaths: FAssetRegistryExportPath[]
    texts: string[] = [] // FText objects serialized in NSLOCTEXT() strings

    nameMap: string[]

    getLoadOrder(initialMagic: number) {
        return initialMagic === OLD_BEGIN_MAGIC ? ELoadOrder.Member :
            initialMagic === BEGIN_MAGIC ? ELoadOrder.TextFirst :
            null
    }

    getAnsiString(idx: number): string {
        const offset = this.ansiStringOffsets[idx]
        let length = 0
        while (this.ansiStrings[offset + length] !== 0) ++length
        return Buffer.from(this.ansiStrings, offset, length).toString("utf-8")
    }

    getWideString(idx: number): string {
        const offset = this.wideStringOffsets[idx]
        var length = 0
        while (this.wideStrings[offset + length] !== 0 && this.wideStrings[offset + length + 1] !== 0) length += 2
        return Buffer.from(this.wideStrings, offset, length).toString("utf16le")
    }
}

export enum ELoadOrder {
    Member = "Member",
    TextFirst = "TextFirst"
}

export class FPartialMapHandle {
    int: number
    bHasNumberlessKeys: boolean
    num: number
    pairBegin: number

    constructor(int: number) {
        this.int = int
        this.bHasNumberlessKeys = int >> 63 > 0
        this.num = int >> 32
        this.pairBegin = int
    }

    makeFullHandle(store: FStore) {
        return new FMapHandle(this, store)
    }

    toInt() {
        return ((this.bHasNumberlessKeys ? 1 : 0) << 63) | (this.num << 32) | this.pairBegin
    }
}

export class FValueHandle {
    store: FStore
    id: FValueId

    constructor(store: FStore, id: FValueId) {
        this.store = store
        this.id = id
    }

    asString(): string {
        const index = this.id.index
        return this.id.type === EValueType.AnsiString ? this.store.getAnsiString(index) :
            this.id.type === EValueType.WideString ? this.store.getWideString(index) :
            this.id.type === EValueType.NumberlessName ? this.store.nameMap[this.store.numberlessNames[index].value] :
            this.id.type === EValueType.Name ? this.store.names[index].text :
            this.id.type === EValueType.NumberlessExportPath ? this.store.numberlessExportPaths[index].toString() :
            this.id.type === EValueType.ExportPath ? this.store.exportPaths[index].toString() :
            this.id.type === EValueType.LocalizedText ? this.store.texts[index].toString() :
            ""
    }
}