/** URL structure. */
import { FArchive } from "../../reader/FArchive";

export class FUrl {
    /** Protocol, i.e. "unreal" or "http". */
    public protocol: string

    /** Optional hostname, i.e. "204.157.115.40" or "unreal.epicgames.com", blank if local. */
    public host: string

    /** Optional host port. */
    public port: number

    public valid: number

    /** Map name, i.e. "SkyCity", default is "Entry". */
    public map: string

    /** Options. */
    public op: string[]

    /** Portal to enter through, default is "". */
    public portal: string

    constructor(Ar: FArchive)
    constructor(protocol: string, host: string, map: string, portal: string, op: string[], port: number, valid: number)
    constructor(...args) {
        if (args[0] instanceof FArchive) {
            const Ar = args[0]
            this.protocol = Ar.readString()
            this.host = Ar.readString()
            this.map = Ar.readString()
            this.portal = Ar.readString()
            this.op = Ar.readArray(() => Ar.readString())
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