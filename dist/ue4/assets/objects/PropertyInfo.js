"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyInfo = void 0;
const PropertyType_1 = require("./PropertyType");
/**
 * Property info
 */
class PropertyInfo {
    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...params) {
        /**
         * Index
         * @type {number}
         * @public
         */
        this.index = 0;
        /**
         * Type of this property
         * @type {PropertyType}
         * @public
         */
        this.type = new PropertyType_1.PropertyType();
        /**
         * Array dim
         * @type {number}
         * @public
         */
        this.arrayDim = 1;
        if (typeof params[0] === "string") {
            this.name = params[0];
            this.type = params[1];
            this.arrayDim = params[2];
        }
        else {
            const json = params[0];
            this.index = json.index;
            this.name = json.name;
            this.type = new PropertyType_1.PropertyType(json);
            this.arrayDim = json.arrayDim || 0;
        }
    }
    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString() {
        return `${this.index} = ${this.name}`;
    }
}
exports.PropertyInfo = PropertyInfo;
