import { FAssetArchive } from "../reader/FAssetArchive";
import { EBulkDataFlags, EBulkDataFlags_Check } from "../enums/EBulkDataFlags";
import { FArchiveWriter } from "../../writer/FArchiveWriter";

export class FByteBulkDataHeader {
    public bulkDataFlags: number
    public elementCount: number
    public sizeOnDisk: number
    public offsetInFile: number

    constructor(Ar: FAssetArchive)
    constructor(bulkDataFlags: number, elementCount: number, sizeOnDisk: number, offsetInFile: number)
    constructor(...args) {
        const arg = args[0]
        if (arg instanceof FAssetArchive) {
            this.bulkDataFlags = arg.readInt32()
            if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_Size64Bit, this.bulkDataFlags)) {
                this.elementCount = Number(arg.readInt64())
                this.sizeOnDisk = Number(arg.readInt64())
            } else {
                this.elementCount = arg.readInt32()
                this.sizeOnDisk = arg.readInt32()
            }
            this.offsetInFile = Number(arg.readInt32())
            if (!EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_NoOffsetFixUp, this.bulkDataFlags)) {
                this.offsetInFile += arg.bulkDataStartOffset
            }
            if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_BadDataVersion, this.bulkDataFlags)) {
                arg.pos += 2 // const dummyValue = Ar.readUInt16()
            }
        } else {
            this.bulkDataFlags = arg
            this.elementCount = args[1]
            this.sizeOnDisk = args[2]
            this.offsetInFile = args[3]
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.bulkDataFlags)
        if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_Size64Bit, this.bulkDataFlags)) {
            Ar.writeInt64(this.elementCount)
            Ar.writeInt64(this.sizeOnDisk)
        } else {
            Ar.writeInt32(this.elementCount)
            Ar.writeInt32(this.sizeOnDisk)
        }
        Ar.writeInt64(this.offsetInFile)
    }

    toJson() {
        const bulkDataFlag = Object.keys(EBulkDataFlags).find(e => EBulkDataFlags[e] === this.bulkDataFlags)
        return {
            bulkDataFlag: bulkDataFlag,
            elementCount: this.elementCount,
            sizeOnDisk: this.sizeOnDisk,
            offsetInFile: this.offsetInFile
        }
    }
}