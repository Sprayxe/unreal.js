import { FArchive } from "../../reader/FArchive";

export class FNameEntry {
    name: string
    nonCasePreservingHash: number
    casePreservingHash: number

    constructor(Ar: FArchive)
    constructor(name: string, nonCasePreservingHash: number, casePreservingHash: number)
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            this.name = x.readString()
            this.nonCasePreservingHash = x.readUInt16()
            this.casePreservingHash = x.readUInt16()
        } else {
            this.name = x
            this.nonCasePreservingHash = y
            this.casePreservingHash = z
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

export class FName {
    nameMap: FNameEntry[] = [new FNameEntry("None", 0, 0)]
    index: number = 0
    num: number = 0

    constructor(nameMap?: any[], index?: number, num?: number) {
        if (index != null) {
            this.nameMap = nameMap
            this.index = index
            this.num = num
        }
    }

    toString() {
        return this.text
    }

    get text(): string {
        const name = this.index === -1 ? "None" : this.nameMap[this.index].name
        return this.num === 0 ? name : `${name}_${this.num - 1}`
    }
    set text(v) {
        this.nameMap[this.index].name = v
    }

    equals(other: any): boolean {
        if (this === other) return true;
        if (!(other instanceof FName)) return false;
        return this.text === other.text
    }

    isNone(): boolean {
        return this.text === "None"
    }

    static NAME_None = new FName()

    static dummy(text: string, num: number = 0) {
        return new FNameDummy(text, num)
    }

    static getByNameMap(text: string, nameMap: FNameEntry[]): FName {
        const nameEntry = nameMap.find(f => f.name === text)
        return nameEntry ? new FName(nameMap, nameMap.indexOf(nameEntry), 0) : null
    }

    static createFromDisplayId(text: string, num: number) {
        return this.dummy(text, num)
    }
}

export class FNameDummy extends FName {
    name: string
    num: number = 0

    constructor(name: string, num: number) {
        super([], -1)
        this.name = name
        this.num = num
    }

    get text(): string {
        return this.num === 0 ? this.name : `${this.name}_${this.num - 1}`
    }
    set text(v) {
        this.name = v
    }
}