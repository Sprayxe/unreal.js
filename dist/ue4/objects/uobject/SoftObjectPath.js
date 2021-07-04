"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSoftClassPath = exports.FSoftObjectPath = void 0;
const FName_1 = require("./FName");
const FArchive_1 = require("../../reader/FArchive");
/**
 * A struct that contains a string reference to an object, either a top level asset or a subobject
 * This can be used to make soft references to assets that are loaded on demand
 * This is stored internally as an FName pointing to the top level asset (/package/path.assetname) and an option a string subobject path
 * If the MetaClass metadata is applied to a FProperty with this the UI will restrict to that type of asset
 * @implements {IStructType}
 */
class FSoftObjectPath {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        /**
         * Owner
         * @type {Package}
         * @public
         */
        this.owner = null;
        if (!x) {
            this.assetPathName = FName_1.FName.NAME_None;
            this.subPathString = "";
        }
        else {
            if (x instanceof FArchive_1.FArchive) {
                this.assetPathName = x.readFName();
                this.subPathString = x.readString();
            }
            else {
                this.assetPathName = x;
                this.subPathString = y;
            }
        }
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeFName(this.assetPathName);
        Ar.writeString(this.subPathString);
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        if (this.subPathString === "") {
            return this.assetPathName.isNone() ? "" : this.assetPathName.text;
        }
        else {
            return `${this.assetPathName.text}:${this.subPathString}`;
        }
    }
    /**
     * Loads this
     * @returns {UObject} Object
     * @public
     */
    load() {
        return this.owner?.provider?.loadObject(this);
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return {
            assetPathName: this.assetPathName.text,
            subPathString: this.subPathString
        };
    }
}
exports.FSoftObjectPath = FSoftObjectPath;
/**
 * FSoftClassPath
 * @extends {FSoftObjectPath}
 */
class FSoftClassPath extends FSoftObjectPath {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x, y) {
        if (x) {
            if (x instanceof FArchive_1.FArchive) {
                super(x);
            }
            else {
                super(x, y);
            }
        }
        else {
            super();
        }
    }
}
exports.FSoftClassPath = FSoftClassPath;
