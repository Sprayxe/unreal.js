import { FGuid } from "../misc/Guid";
import Collection from "@discordjs/collection";
import { FArchive } from "../../../reader/FArchive";
import { ParserException } from "../../../../exceptions/Exceptions";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FTextLocalizationResource {
    locResMagic = new FGuid(0x7574140E, 0xFC034A67, 0x9D90154A, 0x1B7F37C3)
    indexNone = -1

    version: number
    strArrayOffset: number
    stringData: Collection<string, Collection<string, string>>

    constructor(Ar: FArchive) {
        const magic = new FGuid(Ar)
        if (magic !== this.locResMagic)
            throw ParserException("Wrong locres guid")
        this.version = Ar.readUInt8()
        this.strArrayOffset = Number(Ar.readInt64())
        if (this.strArrayOffset === this.indexNone)
            throw ParserException("No offset found")

        // Only works for version 'optimized'
        const cOffset = Ar.pos()

        Ar.seek(this.strArrayOffset)
        const localizedStrings = Ar.readTArray(() => new FTextLocalizationResourceString(Ar))
        Ar.seek(cOffset)

        Ar.readUInt32() // entryCount
        const nameSpaceCount = Ar.readUInt32()
        this.stringData = new Collection()

        let i = 0
        while (i < nameSpaceCount) {
            const nameSpace = new FTextKey(Ar)
            const keyCount = Ar.readUInt32()

            const strings = new Collection<string, string>()
            let x = 0
            while (x < keyCount) {
                const textKey = new FTextKey(Ar)
                Ar.readUInt32() // source hash
                const stringIndex = Ar.readInt32()
                if (stringIndex > 0 && stringIndex < localizedStrings.length) {
                    strings.set(textKey.text, localizedStrings[stringIndex].data)
                }
                ++x
            }
            this.stringData.set(nameSpace.text, strings)
            ++i
        }
    }
}

export class FTextLocalizationResourceString {
    data: string
    refCount: number

    constructor(Ar: FArchive)
    constructor(data: string, refCount: number)
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.data = x.readString()
            this.refCount = x.readInt32()
        } else {
            this.data = x
            this.refCount = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeString(this.data)
        Ar.writeInt32(this.refCount)
    }
}


export class FTextKey {
    stringHash: number
    text: string

    constructor(Ar: FArchive)
    constructor(stringHash: number, text: string)
    constructor(x?: any, y?: any) {
        if (x instanceof FArchive) {
            this.stringHash = x.readUInt32()
            this.text = x.readString()
        } else {
            this.stringHash = x
            this.text = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.stringHash)
        Ar.writeString(this.text)
    }
}