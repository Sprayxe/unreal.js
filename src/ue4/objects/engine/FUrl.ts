import { FArchive } from "../../reader/FArchive";

/**
 * URL structure
 */
export class FUrl {
    /**
     * Protocol, i.e. "unreal" or "http"
     * @type {string}
     * @public
     */
    public protocol: string

    /**
     * Optional hostname, i.e. "204.157.115.40" or "unreal.epicgames.com", blank if local
     * @type {string}
     * @public
     */
    public host: string

    /**
     * Optional host port
     * @type {number}
     * @public
     */
    public port: number

    /**
     * Valid
     * @type {number}
     * @public
     */
    public valid: number

    /**
     * Map name, i.e. "SkyCity", default is "Entry".
     * @type {string}
     * @public
     */
    public map: string

    /**
     * Options
     * @type {Array<string>}
     * @public
     */
    public op: string[]

    /**
     * Portal to enter through, default is "".
     * @type {string}
     * @public
     */
    public portal: string

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using a value
     * @param {number} protocol Protocol of url
     * @param {string} host Host of url
     * @param {string} map Map to use
     * @param {string} portal Portal to use
     * @param {Array<string>} op Options
     * @param {number} port Port of url
     * @param {number} valid Valid
     * @constructor
     * @public
     */
    constructor(protocol: string, host: string, map: string, portal: string, op: string[], port: number, valid: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        if (args[0] instanceof FArchive) {
            const Ar = args[0]
            this.protocol = Ar.readString()
            this.host = Ar.readString()
            this.map = Ar.readString()
            this.portal = Ar.readString()
            const opLen = Ar.readInt32()
            this.op = new Array(opLen)
            for (let i = 0; i < opLen; ++i) {
                this.op[i] = Ar.readString()
            }
            this.port = Ar.readInt32()
            this.valid = Ar.readInt32()
        } else {
            this.protocol = args[0]
            this.host = args[1]
            this.map = args[2]
            this.portal = args[3]
            this.op = args[4]
            this.port = args[5]
            this.valid = args[6]
        }
    }
}