/// <reference types="node" />
/// <reference types="ref-napi" />
import { FByteArchive } from "../../reader/FByteArchive";
import { FileProvider } from "../../../fileprovider/FileProvider";
import { PayloadType } from "../util/PayloadType";
import { FName } from "../../objects/uobject/FName";
import { Package } from "../Package";
import { FArchive } from "../../reader/FArchive";
/**
 * UE4 Asset Reader
 * @extends {FByteArchive}
 */
export declare class FAssetArchive extends FByteArchive {
    /**
     * Buffer to read
     * @type {Buffer}
     * @public
     */
    data: Buffer;
    /**
     * File provider
     * @type {FileProvider}
     * @public
     */
    provider?: FileProvider;
    /**
     * Name of package
     * @type {string}
     * @public
     */
    pkgName: string;
    /**
     * Creates an instace
     * @param {Buffer} data Data to read
     * @param {?FileProvider} provider File provider
     * @param {string} pkgName Name of package
     * @constructor
     * @public
     */
    constructor(data: Buffer, provider: FileProvider, pkgName: string);
    /**
     * Package which uses this reader
     * @type {Package}
     * @public
     */
    owner: Package;
    /**
     * Payloads
     * @type {Map<PayloadType, FAssetArchive>}
     * @protected
     */
    protected payloads: Map<PayloadType, FAssetArchive>;
    /**
     * Size of uasset data
     * @type {number}
     * @public
     */
    uassetSize: number;
    /**
     * Size of uexp data
     * @type {number}
     * @public
     */
    uexpSize: number;
    /**
     * Start offset of bulk data
     * @type {number}
     * @public
     */
    bulkDataStartOffset: number;
    /**
     * Gets payload
     * @param {PayloadType} type Type of payload to get
     * @returns {FArchive} UE4 Reader
     * @public
     */
    getPayload(type: PayloadType): FArchive;
    /**
     * Add a payload
     * @param {PayloadType} type Type of payload to add
     * @param {FAssetArchive} payload Reader to add
     * @returns {Map<PayloadType, FAssetArchive>} Updated map
     * @public
     */
    addPayload(type: PayloadType, payload: FAssetArchive): Map<PayloadType, FAssetArchive>;
    /**
     * Clones this reader
     * @returns {FAssetArchive} Cloned reader
     * @public
     */
    clone(): FAssetArchive;
    /**
     * Seeks to relative
     * @param {number} pos Position to seek to
     * @returns {void}
     * @public
     */
    seekRelative(pos: number): void;
    /**
     * Gets relative position
     * @returns {number} Position
     * @public
     */
    relativePos(): number;
    /**
     * Turns a normal pos to relative
     * @param {number} normalPos Normal position
     * @returns {number} Relative position
     * @public
     */
    toRelativePos(normalPos: number): number;
    /**
     * Turns a relative pos to normal
     * @param {number} relativePos Relative position
     * @returns {number} Normal position
     * @public
     */
    toNormalPos(relativePos: number): number;
    /**
     * Handles bad FName index
     * @param {number} nameIndex Bad index
     * @throws {ParserException}
     * @public
     */
    handleBadNameIndex(nameIndex: number): void;
    /**
     * Reads FName
     * @returns {FName} Read data
     * @public
     */
    readFName(): FName;
    /**
     * Returns FAssetArchive info for error
     * @returns {string} Info
     * @public
     */
    printError(): string;
    /**
     * Reads an object
     * @returns {?any} Read object or null
     * @public
     */
    readObject<T>(): T;
}
