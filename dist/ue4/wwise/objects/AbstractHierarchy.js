"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractHierarchy = void 0;
/**
 * AbstractHierarchy
 * @abstract
 */
class AbstractHierarchy {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.id = Ar.readUInt32();
    }
}
exports.AbstractHierarchy = AbstractHierarchy;
