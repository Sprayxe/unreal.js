import { FArchive } from "../../reader/FArchive";
/**
 * FNameEntry
 */
export declare class FNameEntry {
    /**
     * name
     * @type {string}
     * @public
     */
    name: string;
    /**
     * nonCasePreservingHash
     * @type {number}
     * @public
     */
    nonCasePreservingHash: number;
    /**
     * casePreservingHash
     * @type {number}
     * @public
     */
    casePreservingHash: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using values
     * @param {string} name Name to use
     * @param {number} nonCasePreservingHash Non case preserving hash to use
     * @param {number} casePreservingHash Case preserving hash to use
     * @constructor
     * @public
     */
    constructor(name: string, nonCasePreservingHash: number, casePreservingHash: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: any): void;
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString(): string;
}
/**
 * FName
 */
export declare class FName {
    /**
     * Name map
     * @type {Array<FNameEntry>}
     * @public
     */
    nameMap: FNameEntry[];
    /**
     * Index
     * @type {number}
     * @public
     */
    index: number;
    /**
     * Number
     * @type {number}
     * @public
     */
    num: number;
    /**
     * Creates an instance using values
     * @param {Array<FNameEntry>} nameMap Name map to use
     * @param {number} index Index to use
     * @param {number} num Num to use
     * @constructor
     * @public
     */
    constructor(nameMap?: FNameEntry[], index?: number, num?: number);
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString(): string;
    /**
     * String value
     * @type {string}
     * @public
     */
    get text(): string;
    set text(v: string);
    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @public
     */
    equals(other: any): boolean;
    /**
     * Whether none
     * @returns {boolean}
     * @public
     */
    isNone(): boolean;
    /**
     * Empty FName instance
     * @type {FName}
     * @public
     * @static
     */
    static NAME_None: FName;
    /**
     * Creates a dummy instance
     * @param {string} text String value
     * @param {?number} num Number
     * @returns {FNameDummy} Instance
     * @public
     * @static
     */
    static dummy(text: string, num?: number): FNameDummy;
    /**
     * Creates instance by name map
     * @param {string} text String value
     * @param {nameMap} nameMap Name map
     * @returns {?FName} Instance or null
     * @public
     * @static
     */
    static getByNameMap(text: string, nameMap: FNameEntry[]): FName;
    /**
     * Creates from display id
     * @param {string} text String value
     * @param {number} num Number
     * @public
     * @static
     * @see {dummy}
     */
    static createFromDisplayId(text: string, num: number): FNameDummy;
}
/**
 * FNameDummy
 * @extends {FName}
 */
export declare class FNameDummy extends FName {
    /**
     * Name
     * @type {string}
     * @public
     */
    name: string;
    /**
     * Number
     * @type {number}
     * @public
     */
    num: number;
    /**
     * Creates an instance using values
     * @param {string} name String value to use
     * @param {number} num Number to use
     * @constructor
     * @public
     */
    constructor(name: string, num: number);
    /**
     * String value
     * @type {string}
     * @public
     */
    get text(): string;
    set text(v: string);
}
