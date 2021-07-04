import { FArchive } from "../../reader/FArchive";
/**
 * URL structure
 */
export declare class FUrl {
    /**
     * Protocol, i.e. "unreal" or "http"
     * @type {string}
     * @public
     */
    protocol: string;
    /**
     * Optional hostname, i.e. "204.157.115.40" or "unreal.epicgames.com", blank if local
     * @type {string}
     * @public
     */
    host: string;
    /**
     * Optional host port
     * @type {number}
     * @public
     */
    port: number;
    /**
     * Valid
     * @type {number}
     * @public
     */
    valid: number;
    /**
     * Map name, i.e. "SkyCity", default is "Entry".
     * @type {string}
     * @public
     */
    map: string;
    /**
     * Options
     * @type {Array<string>}
     * @public
     */
    op: string[];
    /**
     * Portal to enter through, default is "".
     * @type {string}
     * @public
     */
    portal: string;
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using a value
     * @param {number} protocol Protocol of url
     * @param {string} host Host of url
     * @param {string} map Map to use
     * @param {string} portal Portal to use
     * @param {Array<string>} op Options
     * @param {number} port Port of url
     * @param {number} valid Valid
     * @constructor
     * @public
     */
    constructor(protocol: string, host: string, map: string, portal: string, op: string[], port: number, valid: number);
}
