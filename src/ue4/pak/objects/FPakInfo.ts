import { ParserException } from "../../../exceptions/Exceptions";
import { FByteArchive } from "../../reader/FByteArchive";
import { FArchive } from "../../reader/FArchive";
import { FGuid } from "../../objects/core/misc/Guid";
import { FFileArchive } from "../../reader/FFileArchive";
import { EPakVersion } from "../enums/PakVersion";
import { Utils } from "../../../util/Utils";

export const PAK_MAGIC = 0x5A6F12E1

export const size = 4 * 2 + 8 * 2 + 20 + 1 + 16
export const size8 = size + 4 * 32
export const size8a = size8 + 32
export const size9 = size8a + 1

export const offsetsToTry = [size, size8, size8a, size9]
export const maxNumCompressionMethods = [0, 4, 5, 5]

export class FPakInfo {
    static readPakInfo(Ar: FArchive) {
        const path = Ar instanceof FFileArchive ? Ar.path : "UNKNOWN"
        const pakSize = Ar.size
        let maxSize = -1
        let maxOffsetToTryIndex = -1

        for (let i = offsetsToTry.length - 1; i >= 0; --i) {
            if (pakSize - offsetsToTry[i] >= 0) {
                maxSize = offsetsToTry[i]
                maxOffsetToTryIndex = i
                break
            }
        }

        if (maxSize < 0)
            throw ParserException(`File '${path}' has an unknown format`)
        Ar.pos = pakSize - maxSize

        const tempAr = new FByteArchive(Ar.readBuffer(maxSize))
        let x = 0
        while (x < maxOffsetToTryIndex) {
            tempAr.pos = maxSize - offsetsToTry[x]
            try {
                return new FPakInfo(tempAr, maxNumCompressionMethods[x], path)
            } catch (e) {
                if (!e.message.includes("boolean") && !e.message.includes("magic")) {
                    console.error(e)
                }
            }
            ++x
        }
        throw ParserException(`File '${path}' has an unknown format`)
    }

    encryptionKeyGuid: FGuid
    encryptedIndex: boolean
    version: EPakVersion
    indexOffset: number
    indexSize: number
    indexHash: Buffer
    compressionMethods: string[]
    indexIsFrozen: boolean = false

    constructor(Ar: FArchive, maxNumCompressionMethods: number = 4, fileName?: string) {
        // New FPakInfo fields
        this.encryptionKeyGuid = new FGuid(Ar)
        this.encryptedIndex = Ar.readFlag()

        // Old FPakInfoFields
        const magic = Ar.readUInt32()
        if (magic !== PAK_MAGIC)
            throw ParserException(`Invalid pak file magic '${magic}'${fileName ? ` (${fileName})` : ""}`)

        this.version = Ar.readInt32()
        this.indexOffset = Number(Ar.readInt64())
        this.indexSize = Number(Ar.readInt64())
        this.indexHash = Ar.readBuffer(20)

        if (this.version >= EPakVersion.PakVersion_FrozenIndex && this.version < EPakVersion.PakVersion_PathHashIndex) {
            this.indexIsFrozen = Ar.readBoolean()
            if (this.indexIsFrozen)
                console.warn("Frozen PakFile Index")
        }

        this.compressionMethods = []
        if (this.version >= EPakVersion.PakVersion_FNameBasedCompressionMethod) {
            this.compressionMethods.push("None")
            for (let i = 0; i < maxNumCompressionMethods; ++i) {
                const d = Ar.readBuffer(32)
                const str = Buffer.from(Utils.takeWhile(d, (it) => it !== 0)).toString("utf8")
                if (/\s/g.test(str))
                    return
                this.compressionMethods.push(str)
            }
        }
    }
}