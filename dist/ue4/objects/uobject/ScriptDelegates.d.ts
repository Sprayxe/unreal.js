import { FPackageIndex } from "./ObjectResource";
import { FName } from "./FName";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
/**
 * FScriptDelegate
 */
export declare class FScriptDelegate {
    /**
     * object
     * @type {FPackageIndex}
     * @public
     */
    object: FPackageIndex;
    /**
     * functionName
     * @type {FName}
     * @public
     */
    functionName: FName;
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates instance using values
     * @param {FPackageIndex} object Object to use
     * @param {FName} functionName Function name to use
     * @constructor
     * @public
     */
    constructor(object: FPackageIndex, functionName: FName);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
/**
 * FMulticastScriptDelegate
 */
export declare class FMulticastScriptDelegate {
    invocationList: FScriptDelegate[];
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates instance using a value
     * @param {Array<FScriptDelegate>} invocationList Invocation list to use
     * @constructor
     * @public
     */
    constructor(invocationList: FScriptDelegate[]);
    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter): void;
}
