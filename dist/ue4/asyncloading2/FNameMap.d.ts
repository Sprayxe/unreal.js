/// <reference types="node" />
/// <reference types="ref-napi" />
import { FMappedName_EType, FMappedName } from "./AsyncLoading2";
import { FileProvider } from "../../fileprovider/FileProvider";
import { FArchive } from "../reader/FArchive";
import { FName } from "../objects/uobject/FName";
import { FMinimalName } from "../objects/uobject/NameTypes";
/**
 * FNameMap
 */
export declare class FNameMap {
    /**
     * nameEntries
     * @type {Array<string>}
     * @public
     */
    nameEntries: string[];
    /**
     * nameMapType
     * @type {FMappedName_EType}
     * @public
     */
    nameMapType: FMappedName_EType;
    /**
     * Loads global
     * @param {FileProvider} provider Provider to use
     * @returns {void}
     * @public
     */
    loadGlobal(provider: FileProvider): void;
    /**
     * Length
     * @type {number}
     * @public
     */
    get length(): number;
    /**
     * Loads name entries
     * @param {Buffer} nameBuffer Name buffer
     * @param {Buffer} hashBuffer Hash buffer
     * @param {FMappedName_EType} nameMapType Type
     * @returns {void}
     * @public
     */
    load(nameBuffer: Buffer, hashBuffer: Buffer, nameMapType: FMappedName_EType): any;
    /**
     * Loads name entries
     * @param {FArchive} nameBuffer UE4 Reader
     * @param {FArchive} hashBuffer UE4 Reader
     * @param {FMappedName_EType} nameMapType Type
     * @returns {void}
     * @public
     */
    load(nameBuffer: FArchive, hashBuffer: FArchive, nameMapType: FMappedName_EType): any;
    /**
     * Gets name
     * @param {FMappedName} mappedName Mapped name to look for
     * @returns {FName} Name
     * @public
     * @throws {Error}
     */
    getName(mappedName: FMappedName): FName;
    /**
     * Gets minimal name
     * @param {FMappedName} mappedName Mapped name to look for
     * @returns {FMinimalName} Minimal name
     * @public
     */
    getMinimalName(mappedName: FMappedName): FMinimalName;
}
