"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FGameplayTagContainer = void 0;
const FArchive_1 = require("../../reader/FArchive");
const UnrealArray_1 = require("../../../util/UnrealArray");
/**
 * FGameplayTagContainer
 * @implements {IStructType}
 * @implements {Iterable<FName>}
 */
class FGameplayTagContainer {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg) {
        if (!arg) {
            this.gameplayTags = [];
        }
        else if (arg instanceof FArchive_1.FArchive) {
            this.gameplayTags = new UnrealArray_1.UnrealArray(arg.readUInt32(), () => arg.readFName());
        }
        else {
            this.gameplayTags = arg;
        }
    }
    /**
     * Gets value
     * @param {string} parent Parent
     * @returns {FName} Value
     * @public
     */
    getValue(parent) {
        return this.gameplayTags.find(it => it.text.toLowerCase().startsWith(parent.toLowerCase()));
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeUInt32(this.gameplayTags.length);
        this.gameplayTags.forEach((it) => Ar.writeFName(it));
    }
    [Symbol.iterator]() {
        return this.gameplayTags[Symbol.iterator]();
    }
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson() {
        return this.gameplayTags.map(g => g.text);
    }
}
exports.FGameplayTagContainer = FGameplayTagContainer;
