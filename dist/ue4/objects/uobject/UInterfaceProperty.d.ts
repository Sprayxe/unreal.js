import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
/**
 * UInterfaceProperty
 */
export declare class UInterfaceProperty {
    /**
     * interfaceNumber
     * @type {number}
     * @public
     */
    interfaceNumber: number;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using a value
     * @param {number} interfaceNumber Interface number to use
     * @constructor
     * @public
     */
    constructor(interfaceNumber: number);
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
}
