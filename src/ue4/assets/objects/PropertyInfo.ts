import { PropertyType } from "./PropertyType";

/**
 * Property info
 */
export class PropertyInfo {
    /**
     * Index
     * @type {number}
     * @public
     */
    index = 0

    /**
     * Name
     * @type {string}
     * @public
     */
    name: string

    /**
     * Type of this property
     * @type {PropertyType}
     * @public
     */
    type = new PropertyType()

    /**
     * Array dim
     * @type {number}
     * @public
     */
    arrayDim = 1

    /**
     * Creates an instance from json
     * @param {any} json Json data to use
     * @constructor
     * @public
     */
    constructor(json: any)

    /**
     * Creates an instance from name, type & arrayDim
     * @param {string} name Name to use
     * @param {PropertyType} type Type to use
     * @param {number} arrayDim Array dim to use
     * @constructor
     * @public
     */
    constructor(name: string, type: PropertyType, arrayDim: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        if (typeof params[0] === "string") {
            this.name = params[0]
            this.type = params[1]
            this.arrayDim = params[2]
        } else {
            const json = params[0]
            this.index = json.index
            this.name = json.name
            this.type = new PropertyType(json)
            this.arrayDim = json.arrayDim || 0
        }
    }

    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString() {
        return `${this.index} = ${this.name}`
    }
}