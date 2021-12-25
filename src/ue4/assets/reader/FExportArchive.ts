import { FAssetArchive } from "./FAssetArchive";
import { UObject } from "../exports/UObject";
import { IoPackage } from "../IoPackage";
import { PayloadType } from "../util/PayloadType";
import { ParserException } from "../../../exceptions/Exceptions";
import { createIoChunkId, EIoChunkType, EIoChunkType5 } from "../../io/IoDispatcher";
import { Config } from "../../../Config";
import { Game } from "../../versions/Game";

/**
 * UE4 Export Reader
 * @extends {FAssetArchive}
 */
export class FExportArchive extends FAssetArchive {
    /**
     * Buffer to read
     * @type {Buffer}
     * @public
     */
    public data: Buffer

    /**
     * UObject of this reader
     * @type {UObject}
     * @public
     */
    public obj: UObject

    /**
     * I/O Package of this reader
     * @type {IoPackage}
     * @public
     */
    public pkg: IoPackage

    /**
     * Creates an instance
     * @param {Buffer} data Buffer to read
     * @param {UObject} obj UObject of this reader
     * @param {IoPackage}pkg I/O Package of this reader
     * @constructor
     * @public
     */
    constructor(data: Buffer, obj: UObject, pkg: IoPackage) {
        super(data, pkg.provider, pkg.fileName)
        this.data = data
        this.obj = obj
        this.pkg = pkg
        this.versions = pkg.versions
        this.owner = pkg
    }

    /**
     * Gets payload
     * @param {PayloadType} type Type of payload to get
     * @returns {FAssetArchive} Reader
     * @public
     */
    public getPayload(type: PayloadType): FAssetArchive {
        if (this.provider == null)
            throw new ParserException(`Lazy loading a ${Object.keys(PayloadType)[type]} requires a file provider`)
        let ioChunkType: EIoChunkType | EIoChunkType5
        if (this.game >= Game.GAME_UE5_BASE) {
            if (type === PayloadType.UBULK) ioChunkType = EIoChunkType5.BulkData
            else if (type === PayloadType.M_UBULK) ioChunkType = EIoChunkType5.MemoryMappedBulkData
            else if (type === PayloadType.UPTNL) ioChunkType = EIoChunkType5.OptionalBulkData
        } else {
            if (type === PayloadType.UBULK) ioChunkType = EIoChunkType.BulkData
            else if (type === PayloadType.M_UBULK) ioChunkType = EIoChunkType.MemoryMappedBulkData
            else if (type === PayloadType.UPTNL) ioChunkType = EIoChunkType.OptionalBulkData
        }
        const payloadChunkId = createIoChunkId(this.pkg.packageId, 0, ioChunkType)
        let ioBuffer: Buffer
        try {
            ioBuffer = this.provider.saveChunk(payloadChunkId)
        } catch {
            ioBuffer = Buffer.alloc(0)
        }
        return new FAssetArchive(ioBuffer, this.provider, this.pkgName)
    }

    /**
     * Checks a dummy name
     * @param {string} dummyName Name to check
     * @returns {void}
     * @public
     */
    public checkDummyName(dummyName: string) {
        if (Config.GExportArchiveCheckDummyName && !(dummyName in this.pkg.nameMap.nameEntries)) {
            console.warn(`${dummyName} is not in the package name map. There must be something wrong.`)
        }
    }

    /**
     * Returns FExportArchive info for error
     * @returns {string}
     * @public
     */
    public printError(): string {
        return super.printError()
            .replace("FAssetArchive", "FExportArchive")
    }
}