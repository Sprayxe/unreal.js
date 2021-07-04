import { PropertyType } from "./PropertyType";
/**
 * Property info
 */
export declare class PropertyInfo {
    /**
     * Index
     * @type {number}
     * @public
     */
    index: number;
    /**
     * Name
     * @type {string}
     * @public
     */
    name: string;
    /**
     * Type of this property
     * @type {PropertyType}
     * @public
     */
    type: PropertyType;
    /**
     * Array dim
     * @type {number}
     * @public
     */
    arrayDim: number;
    /**
     * Creates an instance from json
     * @param {any} json Json data to use
     * @constructor
     * @public
     */
    constructor(json: any);
    /**
     * Creates an instance from name, type & arrayDim
     * @param {string} name Name to use
     * @param {PropertyType} type Type to use
     * @param {number} arrayDim Array dim to use
     * @constructor
     * @public
     */
    constructor(name: string, type: PropertyType, arrayDim: number);
    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString(): string;
}
