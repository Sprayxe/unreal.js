import { FName } from "./uobject/FName";
import { FPackageIndex } from "./uobject/ObjectResource";
import { FAssetArchive } from "../assets/reader/FAssetArchive";
/**
 * FFieldPath
 */
export declare class FFieldPath {
    /**
     * path
     * @type {Array<FName>}
     * @public
     */
    path: FName[];
    /**
     * resolvedOwner
     * @type {FPackageIndex}
     * @public
     */
    resolvedOwner: FPackageIndex;
    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor();
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive);
    /**
     * Creates an instance using values
     * @param {Array<FName>} path Path to use
     * @param {FPackageIndex} resolvedOwner Resolved owner to use
     * @constructor
     * @public
     */
    constructor(path: FName[], resolvedOwner: FPackageIndex);
}
