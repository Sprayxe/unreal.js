import { FGuid } from "../misc/Guid";
import { FArchive } from "../../../reader/FArchive";
import { ParserException } from "../../../../exceptions/Exceptions";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import Collection from "@discordjs/collection";

/**
 * FTextLocalizationResource
 */
export class FTextLocalizationResource {
    /**
     * locResMagic
     * @type {FGuid}
     * @public
     */
    locResMagic = new FGuid(0x7574140E, 0xFC034A67, 0x9D90154A, 0x1B7F37C3)

    /**
     * indexNone
     * @type {number}
     * @public
     */
    indexNone = -1

    /**
     * version
     * @type {version}
     * @public
     */
    version: number

    /**
     * strArrayOffset
     * @type {number}
     * @public
     */
    strArrayOffset: number

    /**
     * stringData
     * @type {Collection<string, Collection<string, string>>}
     * @public
     */
    stringData: Collection<string, Collection<string, string>>

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const magic = new FGuid(Ar)
        if (!magic.equals(this.locResMagic))
            throw new ParserException("Wrong locres guid", Ar)
        this.version = Ar.readUInt8()
        this.strArrayOffset = Number(Ar.readInt64())
        if (this.strArrayOffset === this.indexNone)
            throw new ParserException("No offset found", Ar)

        // Only works for version 'optimized'
        const cOffset = Ar.pos

        Ar.pos = this.strArrayOffset
        const len = Ar.readInt32()
        const localizedStrings = new Array<FTextLocalizationResourceString>(len)
        for (let i = 0; i < len; ++i) {
            localizedStrings[i] = new FTextLocalizationResourceString(Ar)
        }
        Ar.pos = cOffset

        Ar.readUInt32() // entryCount
        const nameSpaceCount = Ar.readUInt32()
        this.stringData = new Collection()

        for (let i = 0; i < nameSpaceCount; ++i) {
            const nameSpace = new FTextKey(Ar)
            const keyCount = Ar.readUInt32()
            const strings = new Collection<string, string>()
            for (let x = 0; x < keyCount; ++x) {
                const textKey = new FTextKey(Ar)
                Ar.readUInt32() // source hash
                const stringIndex = Ar.readInt32()
                if (stringIndex > 0 && stringIndex < localizedStrings.length) {
                    strings.set(textKey.text, localizedStrings[stringIndex].data)
                }
            }
            this.stringData.set(nameSpace.text, strings)
        }
    }
}

/**
 * FTextLocalizationResourceString
 */
export class FTextLocalizationResourceString {
    /**
     * Data
     * @type {string}
     * @public
     */
    data: string

    /**
     * refCount
     * @type {number}
     * @public
     */
    refCount: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {string} data Data to use
     * @param {number} refCount Ref count to use
     * @constructor
     * @public
     */
    constructor(data: string, refCount: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.data = x.readString()
            this.refCount = x.readInt32()
        } else {
            this.data = x
            this.refCount = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeString(this.data)
        Ar.writeInt32(this.refCount)
    }
}

/**
 * FTextKey
 */
export class FTextKey {
    /**
     * stringHash
     * @type {number}
     * @public
     */
    stringHash: number

    /**
     * text
     * @type {string}
     * @public
     */
    text: string

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} stringHash String hash to use
     * @param {string} text Text to use
     * @constructor
     * @public
     */
    constructor(stringHash: number, text: string)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.stringHash = x.readUInt32()
            this.text = x.readString()
        } else {
            this.stringHash = x
            this.text = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.stringHash)
        Ar.writeString(this.text)
    }
}