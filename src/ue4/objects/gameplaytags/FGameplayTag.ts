import { FName } from "../uobject/FName";

/**
 * FGameplayTag
 */
export class FGameplayTag {
    /**
     * TagName
     * @type {FName}
     * @public
     */
    public TagName: FName

    /**
     * Creates an instance using FName
     * @param {FName} TagName Tag name to use
     * @constructor
     * @public
     */
    constructor(TagName: FName = FName.NAME_None) {
        this.TagName = TagName
    }

    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString() {
        return this.TagName.text
    }
}