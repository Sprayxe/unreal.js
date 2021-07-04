import { FName } from "./FName";
import { FArchive } from "../../reader/FArchive";
/**
 * INVALID_ID
 * @type {string}
 * @export
 */
export declare const INVALID_ID: string;
/**
 * Creates an I/O package ID
 * @param {FName} name FName to use
 * @returns {bigint} ID
 * @export
 */
export declare function createFPackageId(name: FName): bigint;
/**
 * @deprecated Use '<FArchive>.readUInt64().toString()' or 'createFPackageId(<FName>)'
 */
export declare class FPackageId {
    static fromName(name: FName): FPackageId;
    id: string;
    constructor();
    constructor(id: string);
    constructor(Ar: FArchive);
    isValid(): boolean;
    value(): string;
    equals(other: any): boolean;
    hashCode(): string;
    toString(): string;
}
