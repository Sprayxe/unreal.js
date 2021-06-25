import { FPropertyTag } from "./FPropertyTag";

/**
 * Holds properties in an array
 */
export interface IPropertyHolder {
    /**
     * Properties
     * @type {Array<FPropertyTag>}
     * @public
     */
    properties: FPropertyTag[]
}