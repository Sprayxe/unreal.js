import { FArchive } from "../reader/FArchive";
/**
 * Creates FIoContainer ID
 * @param {bigint | FArchive | null} source Source to use
 * @returns {bigint} ID
 * @export
 */
export declare function createFIoContainerId(source?: bigint | FArchive): bigint;
/**
 * Container ID
 * @deprecated Use 'createFIoContainerId(source?: string | FArchive)' and 'isFIoContainerIdValid(id: string)'
 */
export declare class FIoContainerId {
    /**
     * Invalid ID
     * @type {string}
     * @public
     * @static
     */
    static InvalidId: string;
    /**
     * ID
     * @type {string}
     * @public
     */
    id: string;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using ID
     * @param {string} id ID to use
     * @constructor
     * @public
     */
    constructor(id: string);
    /**
     * Crates an instance using UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Returns ID value
     * @returns {string} ID
     * @public
     */
    value(): string;
    /**
     * Whether valid
     * @returns {boolean} Result
     * @public
     */
    isValid(): boolean;
    /**
     * Whether equals other object
     * @param {?any} other Object to check
     * @returns {boolean} Result
     * @public
     */
    equals(other?: any): boolean;
}
