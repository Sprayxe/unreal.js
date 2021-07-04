"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FByteArchiveWriter = exports.FAssetArchiveWriter = void 0;
const FArchiveWriter_1 = require("../../writer/FArchiveWriter");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const FName_1 = require("../../objects/uobject/FName");
const stream_buffers_1 = require("stream-buffers");
const UnrealMap_1 = require("../../../util/UnrealMap");
class FAssetArchiveWriter extends FArchiveWriter_1.FArchiveWriter {
    constructor(outputStream) {
        super();
        this.littleEndian = true;
        this._pos = 0;
        this.payloads = new UnrealMap_1.UnrealMap();
        this.uassetSize = 0;
        this.uexpSize = 0;
        this.outputStream = outputStream;
    }
    pos() {
        return this._pos;
    }
    getPayload(type) {
        const p = this.payloads.get(type);
        if (!p)
            throw new Exceptions_1.ParserException(`${type} is needed to write the current package`);
        return p;
    }
    addPayload(type, payload) {
        if (this.payloads.has(type))
            throw new Exceptions_1.ParserException(`Can't add a payload that is already attached of type ${type}`);
        this.payloads.set(type, payload);
    }
    relativePos() {
        return this.uassetSize + this.uexpSize + this.pos();
    }
    toNormalPos(relativePos) {
        return relativePos - this.uassetSize - this.uexpSize;
    }
    toRelativePos(normalPos) {
        return normalPos + this.uassetSize + this.uexpSize;
    }
    writeFName(name) {
        if (name instanceof FName_1.FNameDummy)
            return;
        if (this.nameMap[name.index]?.name !== name.text) {
            throw new Exceptions_1.ParserException(`FName does not have a valid value, value in name map : ${this.nameMap[name.index].name}, value in fname : ${name.text}`, this);
        }
        this.writeInt32(name.index);
        this.writeInt32(name.num);
    }
    write(b) {
        if (typeof b === "number") {
            this.write(Buffer.from(new Array(b)));
        }
        else {
            this.outputStream.write(b);
            this._pos += b.length;
        }
    }
    printError() {
        return `FAssetArchiveWriter Info: pos ${this.pos()}`;
    }
    setupByteArrayWriter() {
        const ar = new FByteArchiveWriter();
        ar.uassetSize = this.uassetSize;
        ar.uexpSize = this.uexpSize;
        this.payloads.forEach((v, k) => ar.addPayload(k, v));
        ar.nameMap = this.nameMap;
        ar.importMap = this.importMap;
        ar.exportMap = this.exportMap;
        ar._pos = this._pos;
        return ar;
    }
}
exports.FAssetArchiveWriter = FAssetArchiveWriter;
class FByteArchiveWriter extends FAssetArchiveWriter {
    constructor() {
        const bos = new stream_buffers_1.WritableStreamBuffer();
        super(bos);
        this.bos = bos;
    }
    toByteArray() {
        return this.bos.getContents();
    }
    printError() {
        return super.printError();
    }
}
exports.FByteArchiveWriter = FByteArchiveWriter;
