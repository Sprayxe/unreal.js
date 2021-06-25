import { FGuid } from "../misc/Guid";
import { FArchive } from "../../../reader/FArchive";
import { ParserException } from "../../../../exceptions/Exceptions";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { UnrealMap } from "../../../../util/UnrealMap";

export class FTextLocalizationResource {
    locResMagic = new FGuid(0x7574140E, 0xFC034A67, 0x9D90154A, 0x1B7F37C3)
    indexNone = -1

    version: number
    strArrayOffset: number
    stringData: UnrealMap<string, UnrealMap<string, string>>

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
        const localizedStrings = Ar.readArray(() => new FTextLocalizationResourceString(Ar))
        Ar.pos = cOffset

        Ar.readUInt32() // entryCount
        const nameSpaceCount = Ar.readUInt32()
        this.stringData = new UnrealMap()

        let i = 0
        while (i < nameSpaceCount) {
            const nameSpace = new FTextKey(Ar)
            const keyCount = Ar.readUInt32()

            const strings = new UnrealMap<string, string>()
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