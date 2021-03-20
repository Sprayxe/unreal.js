import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FNameEntry } from "../../objects/uobject/FNameEntry";
import { FObjectExport, FObjectImport } from "../../objects/uobject/ObjectResource";
import { PayloadType } from "../util/PayloadType";
import { ParserException } from "../../../exceptions/Exceptions";
import { FName } from "../../objects/uobject/FName";
import { WritableStreamBuffer } from "stream-buffers"
import { UnrealMap } from "../../../util/UnrealMap";

export class FAssetArchiveWriter extends FArchiveWriter {
    littleEndian = true
    outputStream: WritableStreamBuffer
    pos1 = 0

    constructor(outputStream: WritableStreamBuffer) {
        super()
        this.outputStream = outputStream
    }

    pos() {
        return this.pos1
    }

    // Asset Specific Fields
    nameMap: FNameEntry[]
    importMap: FObjectImport[]
    exportMap: FObjectExport[]

    private payloads = new UnrealMap<PayloadType, FAssetArchiveWriter>()

    getPayload(type: PayloadType) {
        const p = this.payloads.get(type)
        if (!p)
            throw ParserException(`${type} is needed to write the current package`)
        return p
    }

    addPayload(type: PayloadType, payload: FAssetArchiveWriter) {
        if (this.payloads.has(type))
            throw ParserException(`Can't add a payload that is already attached of type ${type}`)
        this.payloads.set(type, payload)
    }

    uassetSize = 0
    uexpSize = 0

    relativePos() {
        return this.uassetSize + this.uexpSize + this.pos()
    }

    toNormalPos(relativePos: number) {
        return relativePos - this.uassetSize - this.uexpSize
    }

    toRelativePos(normalPos: number) {
        return normalPos + this.uassetSize + this.uexpSize
    }

    writeFName(name: FName) {
        if (name instanceof FName.FNameDummy)
            return
        if (this.nameMap[name.index]?.name !== name.text) {
            throw ParserException(`FName does not have a valid value, value in name map : ${this.nameMap[name.index].name}, value in fname : ${name.text}`)
        }
        this.writeInt32(name.index)
        this.writeInt32(name.num)
    }

    write(b: number)
    write(buffer: Buffer)
    write(b: any) {
        if (typeof b === "number") {
            this.write(Buffer.from(new Array(b)))
        } else {
            this.outputStream.write(b)
            this.pos1 += b.length
        }
    }

    printError() {
        return `FAssetArchiveWriter Info: pos ${this.pos()}`
    }

    setupByteArrayWriter(): FByteArchiveWriter {
        const ar = new FByteArchiveWriter()
        ar.uassetSize = this.uassetSize
        ar.uexpSize = this.uexpSize
        this.payloads.forEach((v, k) => ar.addPayload(k, v))
        ar.nameMap = this.nameMap
        ar.importMap = this.importMap
        ar.exportMap = this.exportMap
        ar.pos1 = this.pos()
        return ar
    }
}

export class FByteArchiveWriter extends FAssetArchiveWriter {
    bos: WritableStreamBuffer

    constructor() {
        const bos = new WritableStreamBuffer()
        super(bos)
        this.bos = bos
    }

    toByteArray() {
        return this.bos.getContents()
    }
}