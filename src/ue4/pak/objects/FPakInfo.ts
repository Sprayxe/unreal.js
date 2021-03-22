import { FPakArchive } from "../reader/FPakArchive";
import { ParserException } from "../../../exceptions/Exceptions";
import { FByteArchive } from "../../reader/FByteArchive";
import { FArchive } from "../../reader/FArchive";
import { FGuid } from "../../objects/core/misc/Guid";
import {
    PakVersion_FNameBasedCompressionMethod,
    PakVersion_FrozenIndex,
    PakVersion_PathHashIndex
} from "../enums/PakVersion";

export const PAK_MAGIC = 0x5A6F12E1

export const size = 4 * 2 + 8 * 2 + 20 + 1 + 16
export const size8 = size + 4 * 32
export const size8a = size8 + 32
export const size9 = size8a + 1

export const offsetsToTry = [size, size8, size8a, size9]
export const maxNumCompressionMethods = [0, 4, 5, 5]

export class FPakInfo {
    static readPakInfo(Ar: FPakArchive) {
        const pakSize = Ar.pakSize()
        let maxSize = -1
        let maxOffsetToTryIndex = -1

        for (let i = (offsetsToTry.length - 1); i >= 0; --i) {
            if (pakSize - offsetsToTry[i] >= 0) {
                maxSize = offsetsToTry[i]
                maxOffsetToTryIndex = i
                break
            }
        }

        if (maxSize < 0)
            throw ParserException(`File '${Ar.fileName}' has an unknown format`)
        Ar.seek(pakSize - maxSize)

        const tempAr = new FByteArchive(Ar.read(maxSize))
        let x = 0
        while (x < maxOffsetToTryIndex) {
            tempAr.pos = maxSize - offsetsToTry[x]
            try {
                return new FPakInfo(tempAr, maxNumCompressionMethods[x])
            } catch (e) {
                console.log(e)
            }
            ++x
        }
        throw ParserException(`File '${Ar.fileName}' has an unknown format`)
    }

    encryptionKeyGuid : FGuid
    encryptedIndex : boolean
    version : number
    indexOffset : number
    indexSize : number
    indexHash : Buffer
    compressionMethods : string[]
    indexIsFrozen : boolean = false

    constructor(Ar: FArchive, maxNumCompressionMethods: number = 4) {
        // New FPakInfo fields
        this.encryptedIndex = Ar.readFlag()
        this.encryptionKeyGuid = new FGuid(Ar)

        // Old FPakInfoFields
        const magic = Ar.readUInt32()
        if (magic !== PAK_MAGIC)
            throw ParserException(`Invalid pak file magic '${magic}'`)

        this.version = Ar.readInt32()
        this.indexOffset = Ar.readInt64()
        this.indexSize = Ar.readInt64()
        this.indexHash = Ar.read(20)

        if (this.version >= PakVersion_FrozenIndex && this.version < PakVersion_PathHashIndex) {
            this.indexIsFrozen = Ar.readBoolean()
            if (this.indexIsFrozen)
                console.warn("Frozen PakFile Index")
        }

        this.compressionMethods = []
        if (this.version >= PakVersion_FNameBasedCompressionMethod) {
            this.compressionMethods.push("None")
            let y = 0
            while (y < maxNumCompressionMethods) {
                ++y
                const d = Ar.read(32)
                const str = Buffer.from(d.filter(it => it !== 0)).toString("utf8")
                if (/\s/g.test(str))
                    break
                this.compressionMethods.push(str)
            }
        }
    }
}