"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FNameDummy = exports.FName = exports.FNameEntry = void 0;
const FArchive_1 = require("../../reader/FArchive");
/**
 * FNameEntry
 */
class FNameEntry {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y, z) {
        if (x instanceof FArchive_1.FArchive) {
            this.name = x.readString();
            this.nonCasePreservingHash = x.readUInt16();
            this.casePreservingHash = x.readUInt16();
        }
        else {
            this.name = x;
            this.nonCasePreservingHash = y;
            this.casePreservingHash = z;
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeString(this.name);
        Ar.writeUInt16(this.nonCasePreservingHash);
        Ar.writeUInt16(this.casePreservingHash);
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.name;
    }
}
exports.FNameEntry = FNameEntry;
/**
 * FName
 */
class FName {
    /**
     * Creates an instance using values
     * @param {Array<FNameEntry>} nameMap Name map to use
     * @param {number} index Index to use
     * @param {number} num Num to use
     * @constructor
     * @public
     */
    constructor(nameMap, index, num) {
        /**
         * Name map
         * @type {Array<FNameEntry>}
         * @public
         */
        this.nameMap = [new FNameEntry("None", 0, 0)];
        /**
         * Index
         * @type {number}
         * @public
         */
        this.index = 0;
        /**
         * Number
         * @type {number}
         * @public
         */
        this.num = 0;
        if (index != null) {
            this.nameMap = nameMap;
            this.index = index;
            this.num = num;
        }
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.text;
    }
    /**
     * String value
     * @type {string}
     * @public
     */
    get text() {
        const name = this.index === -1 ? "None" : this.nameMap[this.index].name;
        return this.num === 0 ? name : `${name}_${this.num - 1}`;
    }
    set text(v) {
        this.nameMap[this.index].name = v;
    }
    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @public
     */
    equals(other) {
        if (this === other)
            return true;
        if (!(other instanceof FName))
            return false;
        return this.text === other.text;
    }
    /**
     * Whether none
     * @returns {boolean}
     * @public
     */
    isNone() {
        return this.text === "None";
    }
    /**
     * Creates a dummy instance
     * @param {string} text String value
     * @param {?number} num Number
     * @returns {FNameDummy} Instance
     * @public
     * @static
     */
    static dummy(text, num = 0) {
        return new FNameDummy(text, num);
    }
    /**
     * Creates instance by name map
     * @param {string} text String value
     * @param {nameMap} nameMap Name map
     * @returns {?FName} Instance or null
     * @public
     * @static
     */
    static getByNameMap(text, nameMap) {
        const nameEntry = nameMap.find(f => f.name === text);
        return nameEntry ? new FName(nameMap, nameMap.indexOf(nameEntry), 0) : null;
    }
    /**
     * Creates from display id
     * @param {string} text String value
     * @param {number} num Number
     * @public
     * @static
     * @see {dummy}
     */
    static createFromDisplayId(text, num) {
        return this.dummy(text, num);
    }
}
exports.FName = FName;
/**
 * Empty FName instance
 * @type {FName}
 * @public
 * @static
 */
FName.NAME_None = new FName();
/**
 * FNameDummy
 * @extends {FName}
 */
class FNameDummy extends FName {
    /**
     * Creates an instance using values
     * @param {string} name String value to use
     * @param {number} num Number to use
     * @constructor
     * @public
     */
    constructor(name, num) {
        super([], -1);
        /**
         * Number
         * @type {number}
         * @public
         */
        this.num = 0;
        this.name = name;
        this.num = num;
    }
    /**
     * String value
     * @type {string}
     * @public
     */
    get text() {
        return this.num === 0 ? this.name : `${this.name}_${this.num - 1}`;
    }
    set text(v) {
        this.name = v;
    }
}
exports.FNameDummy = FNameDummy;
