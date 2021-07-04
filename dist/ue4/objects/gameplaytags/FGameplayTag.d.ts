import { FName } from "../uobject/FName";
/**
 * FGameplayTag
 */
export declare class FGameplayTag {
    /**
     * TagName
     * @type {FName}
     * @public
     */
    TagName: FName;
    /**
     * Creates an instance using FName
     * @param {FName} TagName Tag name to use
     * @constructor
     * @public
     */
    constructor(TagName?: FName);
    /**
     * Turns this into string
     * @returns {string} Result
     * @public
     */
    toString(): string;
}
