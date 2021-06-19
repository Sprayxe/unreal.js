import { FAssetArchive } from "./FAssetArchive";
import { UObject } from "../exports/UObject";
import { GExportArchiveCheckDummyName } from "../../../Globals";
import { IoPackage } from "../IoPackage";
import { PayloadType } from "../util/PayloadType";
import { ParserException } from "../../../exceptions/Exceptions";
import { createIoChunkId, EIoChunkType } from "../../io/IoDispatcher";

export class FExportArchive extends FAssetArchive {
    data: Buffer
    obj: UObject
    pkg: IoPackage

    constructor(data: Buffer, obj: UObject, pkg: IoPackage) {
        super(data, pkg.provider, pkg.fileName)
        this.data = data
        this.obj = obj
        this.pkg = pkg
        this.game = pkg.game.game
        this.ver = pkg.game.version
        this.owner = pkg
    }

    getPayload(type: PayloadType): FAssetArchive {
        if (this.provider == null)
            throw ParserException(`Lazy loading a ${Object.keys(PayloadType)[type]} requires a file provider`)
        let ioChunkType: EIoChunkType
        if (type === PayloadType.UBULK) ioChunkType = EIoChunkType.BulkData
        else if (type === PayloadType.M_UBULK) ioChunkType = EIoChunkType.MemoryMappedBulkData
        else if (type === PayloadType.UPTNL) ioChunkType = EIoChunkType.OptionalBulkData
        const payloadChunkId = createIoChunkId(this.pkg.packageId, 0, ioChunkType)
        let ioBuffer: Buffer
        try {
            ioBuffer = this.provider.saveChunk(payloadChunkId)
        } catch  { ioBuffer = Buffer.alloc(0) }
        return new FAssetArchive(ioBuffer, this.provider, this.pkgName)
    }

    checkDummyName(dummyName: string) {
        if (GExportArchiveCheckDummyName && !(dummyName in this.pkg.nameMap.nameEntries)) {
            console.warn(`${dummyName} is not in the package name map. There must be something wrong.`)
        }
    }
}