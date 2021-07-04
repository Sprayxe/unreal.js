import { FName } from "../uobject/FName";
import { FArchive } from "../../reader/FArchive";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";
/**
 * FGameplayTagContainer
 * @implements {IStructType}
 * @implements {Iterable<FName>}
 */
export declare class FGameplayTagContainer implements Iterable<FName>, IStructType {
    /**
     * gameplayTags
     * @type {Array<FName>}
     * @public
     */
    gameplayTags: FName[];
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive);
    /**
     * Creates an instance using a value
     * @param {Array<FName>} gameplayTags Gameplay tags to use
     * @constructor
     * @public
     */
    constructor(gameplayTags: FName[]);
    /**
     * Gets value
     * @param {string} parent Parent
     * @returns {FName} Value
     * @public
     */
    getValue(parent: string): FName;
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter): void;
    [Symbol.iterator](): IterableIterator<FName>;
    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any;
}
