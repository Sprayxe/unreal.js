import { FName } from "./FName";
import { FArchive } from "../../reader/FArchive";
import { CityHash } from "../../../util/CityHash";

export const INVALID_ID = (~0).toString()

export function createFPackageId(name: FName): bigint {
    const nameStr = name.toString().toLowerCase()
    const nameBuf = Buffer.from(nameStr, "utf16le")
    const hash = CityHash.cityHash64(nameBuf, 0, nameBuf.length).toUnsigned().toString()
    if (hash === INVALID_ID)
        throw new Error(`Package name hash collision \"${nameStr}\" and InvalidId`)
    return BigInt(hash)
}

/**
 * @deprecated Use '<FArchive>.readUInt64().toString()' or 'createFPackageId(<FName>)'
 */
export class FPackageId {
    static fromName(name: FName) {
        const nameStr = name.toString().toLowerCase()
        const nameBuf = Buffer.from(nameStr, "utf16le")
        const hash = CityHash.cityHash64(nameBuf, 0, nameBuf.length).toUnsigned().toString()
        if (hash === INVALID_ID)
            throw new Error(`Package name hash collision \"${nameStr}\" and InvalidId`)
        return new FPackageId(hash)
    }

    id = INVALID_ID

    constructor()
    constructor(id: string)
    constructor(Ar: FArchive)
    constructor(x?: any) {
        if (x instanceof FArchive) {
            this.id = x.readUInt64().toString()
        } else {
            this.id = x
        }
    }

    isValid() {
        return this.id !== INVALID_ID
    }

    value() {
        if (this.id === INVALID_ID)
            throw new Error("Field 'id' must not be zero")
        return this.id
    }

    equals(other: any) {
        if (this === other) return true
        if (!(other instanceof FPackageId)) return false
        return this.id === other.id
    }

    hashCode() {
        return this.id
    }

    toString() {
        return this.id
    }
}
