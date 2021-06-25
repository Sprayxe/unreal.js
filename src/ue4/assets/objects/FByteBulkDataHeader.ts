import { FAssetArchive } from "../reader/FAssetArchive";
import { EBulkDataFlags, EBulkDataFlags_Check } from "../enums/EBulkDataFlags";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { VER_UE4_BULKDATA_AT_LARGE_OFFSETS } from "../../versions/Versions";

export class FByteBulkDataHeader {
    /**
     * Bulk data flags
     * @type {number}
     * @public
     */
    public bulkDataFlags: number

    /**
     * Element count
     * @type {number}
     * @public
     */
    public elementCount: number

    /**
     * Size on disk
     * @type {number}
     * @public
     */
    public sizeOnDisk: number

    /**
     * Offset in file
     * @type {number}
     * @public
     */
    public offsetInFile: number

    /**
     * Creates an instance using FAssetArchive
     * @param {FAssetArchive} Ar
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates an instance using bulkDataFlags, elementCount, sizeOnDisk & offsetInFile
     * @param {number} bulkDataFlags
     * @param {number} elementCount
     * @param {number} sizeOnDisk
     * @param {number} offsetInFile
     * @constructor
     * @public
     */
    constructor(bulkDataFlags: number, elementCount: number, sizeOnDisk: number, offsetInFile: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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
            this.offsetInFile = arg.ver >= VER_UE4_BULKDATA_AT_LARGE_OFFSETS ? Number(arg.readInt64()) : arg.readInt32()
            if (!EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_NoOffsetFixUp, this.bulkDataFlags)) {
                this.offsetInFile += arg.bulkDataStartOffset
            }
            if (EBulkDataFlags_Check(EBulkDataFlags.BULKDATA_BadDataVersion, this.bulkDataFlags)) {
                arg.pos += 2 // const dummyValue = Ar.readUInt16()
                this.bulkDataFlags &= ~EBulkDataFlags.BULKDATA_BadDataVersion
            }
        } else {
            this.bulkDataFlags = arg
            this.elementCount = args[1]
            this.sizeOnDisk = args[2]
            this.offsetInFile = args[3]
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar FArchiveWriter to use
     * @public
     */
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

    /**
     * Converts this to json
     * @returns {object} json
     * @public
     */
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