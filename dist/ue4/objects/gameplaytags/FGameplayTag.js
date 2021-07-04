"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FGameplayTag = void 0;
const FName_1 = require("../uobject/FName");
/**
 * FGameplayTag
 */
class FGameplayTag {
    /**
     * Creates an instance using FName
     * @param {FName} TagName Tag name to use
     * @constructor
     * @public
     */
    constructor(TagName = FName_1.FName.NAME_None) {
        this.TagName = TagName;
    }
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.TagName.text;
    }
}
exports.FGameplayTag = FGameplayTag;
