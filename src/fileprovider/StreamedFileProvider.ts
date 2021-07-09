import { FileProvider } from "./FileProvider";
import { Ue4Version } from "../ue4/versions/Game";
import { StringExt } from "../util/StringExt";
import { PakFileReader } from "../ue4/pak/PakFileReader";
import { EIoStoreTocReadOptions, FIoStoreReader } from "../ue4/io/IoStore";

/**
 * StreamedFileProvider
 * @extends {FileProvider}
 */
export class StreamedFileProvider extends FileProvider {
    static async FortniteLive() {

    }

    static async ValorantLive() {

    }

    /**
     * Live game
     * @type {string}
     * @public
     */
    public liveGame: string

    /**
     * Creates an instance
     * @param {string} liveGame Live game to use
     * @param {Ue4Version} game Game version to use
     * @constructor
     * @public
     */
    constructor(liveGame: string, game?: Ue4Version) {
        super("", game)
        this.liveGame = liveGame
    }

    /**
     * Initializes a stream
     * @param {string} file File to use
     * @param {Buffer[]} stream Stream to use
     * @returns {Promise<void>}
     * @public
     */
    public async initialize(file: string = "", stream: Buffer[] = null): Promise<void> {
        const ext = StringExt.substringAfter(file, ".").toLowerCase()
        if (ext === "") return
        if (ext === "pak") {
            try {
                const reader = new PakFileReader(file, this.game.game, stream[0]) // TODO reader.concurrent
                if (!reader.isEncrypted()) {
                    this.mount(reader)
                } else {
                    this.unloadedPaks.push(reader)
                    this.requiredKeys.push(reader.pakInfo.encryptionKeyGuid)
                }
            } catch (e) {
                console.error(e)
            }
        } else if (ext === "utoc") {
            let reader: FIoStoreReader
            try {
                reader = new FIoStoreReader()
                reader._initialize(stream[0], stream[1], file, this.keys, EIoStoreTocReadOptions.ReadDirectoryIndex)
                this.mountedIoStoreReaders.push(reader)
            } catch (e) {
                console.error(e)
            }
        }
    }
}