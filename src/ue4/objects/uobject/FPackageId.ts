import { FName } from "./FName";
import { city64 } from "google-cityhash"
import { FArchive } from "../../reader/FArchive";

export const INVALID_ID = (~0).toString()
export class FPackageId {
    static fromName(name: FName) {
        const nameStr = name.toString().toLowerCase()
        const nameBuf = Buffer.from(nameStr).toString("utf16le")
        const hash = city64(nameBuf).toUnsigned().toString()
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

    valueForDebugging() {
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