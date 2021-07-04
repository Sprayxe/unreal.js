/// <reference types="node" />
/// <reference types="ref-napi" />
import { FAssetArchive } from "./FAssetArchive";
import { UObject } from "../exports/UObject";
import { IoPackage } from "../IoPackage";
import { PayloadType } from "../util/PayloadType";
/**
 * UE4 Export Reader
 * @extends {FAssetArchive}
 */
export declare class FExportArchive extends FAssetArchive {
    /**
     * Buffer to read
     * @type {Buffer}
     * @public
     */
    data: Buffer;
    /**
     * UObject of this reader
     * @type {UObject}
     * @public
     */
    obj: UObject;
    /**
     * I/O Package of this reader
     * @type {IoPackage}
     * @public
     */
    pkg: IoPackage;
    /**
     * Creates an instance
     * @param {Buffer} data Buffer to read
     * @param {UObject} obj UObject of this reader
     * @param {IoPackage}pkg I/O Package of this reader
     * @constructor
     * @public
     */
    constructor(data: Buffer, obj: UObject, pkg: IoPackage);
    /**
     * Gets payload
     * @param {PayloadType} type Type of payload to get
     * @returns {FAssetArchive} Reader
     * @public
     */
    getPayload(type: PayloadType): FAssetArchive;
    /**
     * Checks a dummy name
     * @param {string} dummyName Name to check
     * @returns {void}
     * @public
     */
    checkDummyName(dummyName: string): void;
    /**
     * Returns FExportArchive info for error
     * @returns {string}
     * @public
     */
    printError(): string;
}
