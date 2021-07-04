"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FExportArchive = void 0;
const FAssetArchive_1 = require("./FAssetArchive");
const PayloadType_1 = require("../util/PayloadType");
const Exceptions_1 = require("../../../exceptions/Exceptions");
const IoDispatcher_1 = require("../../io/IoDispatcher");
const Config_1 = require("../../../Config");
/**
 * UE4 Export Reader
 * @extends {FAssetArchive}
 */
class FExportArchive extends FAssetArchive_1.FAssetArchive {
    /**
     * Creates an instance
     * @param {Buffer} data Buffer to read
     * @param {UObject} obj UObject of this reader
     * @param {IoPackage}pkg I/O Package of this reader
     * @constructor
     * @public
     */
    constructor(data, obj, pkg) {
        super(data, pkg.provider, pkg.fileName);
        this.data = data;
        this.obj = obj;
        this.pkg = pkg;
        this.game = pkg.game.game;
        this.ver = pkg.game.version;
        this.owner = pkg;
    }
    /**
     * Gets payload
     * @param {PayloadType} type Type of payload to get
     * @returns {FAssetArchive} Reader
     * @public
     */
    getPayload(type) {
        if (this.provider == null)
            throw new Exceptions_1.ParserException(`Lazy loading a ${Object.keys(PayloadType_1.PayloadType)[type]} requires a file provider`);
        let ioChunkType;
        if (type === PayloadType_1.PayloadType.UBULK)
            ioChunkType = IoDispatcher_1.EIoChunkType.BulkData;
        else if (type === PayloadType_1.PayloadType.M_UBULK)
            ioChunkType = IoDispatcher_1.EIoChunkType.MemoryMappedBulkData;
        else if (type === PayloadType_1.PayloadType.UPTNL)
            ioChunkType = IoDispatcher_1.EIoChunkType.OptionalBulkData;
        const payloadChunkId = IoDispatcher_1.createIoChunkId(this.pkg.packageId, 0, ioChunkType);
        let ioBuffer;
        try {
            ioBuffer = this.provider.saveChunk(payloadChunkId);
        }
        catch {
            ioBuffer = Buffer.alloc(0);
        }
        return new FAssetArchive_1.FAssetArchive(ioBuffer, this.provider, this.pkgName);
    }
    /**
     * Checks a dummy name
     * @param {string} dummyName Name to check
     * @returns {void}
     * @public
     */
    checkDummyName(dummyName) {
        if (Config_1.Config.GExportArchiveCheckDummyName && !(dummyName in this.pkg.nameMap.nameEntries)) {
            console.warn(`${dummyName} is not in the package name map. There must be something wrong.`);
        }
    }
    /**
     * Returns FExportArchive info for error
     * @returns {string}
     * @public
     */
    printError() {
        return super.printError()
            .replace("FAssetArchive", "FExportArchive");
    }
}
exports.FExportArchive = FExportArchive;
