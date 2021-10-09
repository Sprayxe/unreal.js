import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FArchive } from "../../reader/FArchive";

/**
 * FManifestMeta
 */
export class FManifestMeta {
    /**
     * Whether file data int
     * @type {boolean}
     * @public
     */
    public isFileDataInt: boolean

    /**
     * App id
     * @type {number}
     * @public
     */
    public appId: number

    /**
     * App name
     * @type {string}
     * @public
     */
    public appName: string

    /**
     * Version
     * @type {string}
     * @public
     */
    public buildVersion: string

    /**
     * Launch exe
     * @type {string}
     * @public
     */
    public launchExe: string

    /**
     * Launch command
     * @type {string}
     * @public
     */
    public launchCommand: string

    /**
     * Prereq ids
     * @type {Array<string>}
     * @public
     */
    public prereqIds: string[]

    /**
     * Prereq name
     * @type {string}
     * @public
     */
    public prereqName: string

    /**
     * Prereq path
     * @type {string}
     * @public
     */
    public prereqPath: string

    /**
     * Prereq args
     * @type {string}
     * @public
     */
    public prereqArgs: string

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const startPos = Ar.pos
        const dataSize = Ar.readUInt32()
        /*val dataVersionInt = */
        Ar.readUInt8()
        /*val featureLevelInt = */
        Ar.readInt32()
        this.isFileDataInt = Ar.readFlag()
        this.appId = Ar.readUInt32()
        this.appName = Ar.readString()
        this.buildVersion = Ar.readString()
        this.launchExe = Ar.readString()
        this.launchCommand = Ar.readString()
        const len = Ar.readInt32()
        this.prereqIds = new Array(len)
        for (let i = 0; i < len; ++i) {
            this.prereqIds[i] = Ar.readString()
        }
        this.prereqName = Ar.readString()
        this.prereqPath = Ar.readString()
        this.prereqArgs = Ar.readString()
        Ar.pos = startPos + dataSize
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
    }
}