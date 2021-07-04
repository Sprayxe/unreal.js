import { FArchive } from "../../reader/FArchive";

/**
 * FNameEntry
 */
export class FNameEntry {
    /**
     * name
     * @type {string}
     * @public
     */
    name: string

    /**
     * nonCasePreservingHash
     * @type {number}
     * @public
     */
    nonCasePreservingHash: number

    /**
     * casePreservingHash
     * @type {number}
     * @public
     */
    casePreservingHash: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {string} name Name to use
     * @param {number} nonCasePreservingHash Non case preserving hash to use
     * @param {number} casePreservingHash Case preserving hash to use
     * @constructor
     * @public
     */
    constructor(name: string, nonCasePreservingHash: number, casePreservingHash: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
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

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: any) {
        Ar.writeString(this.name)
        Ar.writeUInt16(this.nonCasePreservingHash)
        Ar.writeUInt16(this.casePreservingHash)
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.name
    }
}

/**
 * FName
 */
export class FName {
    /**
     * Name map
     * @type {Array<FNameEntry>}
     * @public
     */
    nameMap: FNameEntry[] = [new FNameEntry("None", 0, 0)]

    /**
     * Index
     * @type {number}
     * @public
     */
    index: number = 0

    /**
     * Number
     * @type {number}
     * @public
     */
    num: number = 0

    /**
     * Creates an instance using values
     * @param {Array<FNameEntry>} nameMap Name map to use
     * @param {number} index Index to use
     * @param {number} num Num to use
     * @constructor
     * @public
     */
    constructor(nameMap?: FNameEntry[], index?: number, num?: number) {
        if (index != null) {
            this.nameMap = nameMap
            this.index = index
            this.num = num
        }
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.text
    }

    /**
     * String value
     * @type {string}
     * @public
     */
    get text(): string {
        const name = this.index === -1 ? "None" : this.nameMap[this.index].name
        return this.num === 0 ? name : `${name}_${this.num - 1}`
    }

    set text(v) {
        this.nameMap[this.index].name = v
    }

    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @public
     */
    equals(other: any): boolean {
        if (this === other) return true;
        if (!(other instanceof FName)) return false;
        return this.text === other.text
    }

    /**
     * Whether none
     * @returns {boolean}
     * @public
     */
    isNone(): boolean {
        return this.text === "None"
    }

    /**
     * Empty FName instance
     * @type {FName}
     * @public
     * @static
     */
    static NAME_None = new FName()

    /**
     * Creates a dummy instance
     * @param {string} text String value
     * @param {?number} num Number
     * @returns {FNameDummy} Instance
     * @public
     * @static
     */
    static dummy(text: string, num: number = 0) {
        return new FNameDummy(text, num)
    }

    /**
     * Creates instance by name map
     * @param {string} text String value
     * @param {nameMap} nameMap Name map
     * @returns {?FName} Instance or null
     * @public
     * @static
     */
    static getByNameMap(text: string, nameMap: FNameEntry[]): FName {
        const nameEntry = nameMap.find(f => f.name === text)
        return nameEntry ? new FName(nameMap, nameMap.indexOf(nameEntry), 0) : null
    }

    /**
     * Creates from display id
     * @param {string} text String value
     * @param {number} num Number
     * @public
     * @static
     * @see {dummy}
     */
    static createFromDisplayId(text: string, num: number) {
        return this.dummy(text, num)
    }
}

/**
 * FNameDummy
 * @extends {FName}
 */
export class FNameDummy extends FName {
    /**
     * Name
     * @type {string}
     * @public
     */
    name: string

    /**
     * Number
     * @type {number}
     * @public
     */
    num: number = 0

    /**
     * Creates an instance using values
     * @param {string} name String value to use
     * @param {number} num Number to use
     * @constructor
     * @public
     */
    constructor(name: string, num: number) {
        super([], -1)
        this.name = name
        this.num = num
    }

    /**
     * String value
     * @type {string}
     * @public
     */
    get text(): string {
        return this.num === 0 ? this.name : `${this.name}_${this.num - 1}`
    }

    set text(v) {
        this.name = v
    }
}