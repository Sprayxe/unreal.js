import { FArchive } from "../../reader/FArchive";

export class FNameEntry {
    name: string
    nonCasePreservingHash: number
    casePreservingHash: number

    constructor(Ar: FArchive)
    constructor(name: string, nonCasePreservingHash: number, casePreservingHash: number)
    constructor(...params) {
        const a = (x: number) => params[x]
        if (a(0) instanceof FArchive) {
            const Ar = a(0)
            this.name = Ar.readString()
            this.nonCasePreservingHash = Ar.readUInt16()
            this.casePreservingHash = Ar.readUInt16()
        } else {
            this.name = a(0)
            this.nonCasePreservingHash = a(1)
            this.casePreservingHash = a(2)
        }
    }

    serialize(Ar: any) {
        Ar.writeString(this.name)
        Ar.writeUInt16(this.nonCasePreservingHash)
        Ar.writeUInt16(this.casePreservingHash)
    }

    toString() {
        return this.name
    }
}