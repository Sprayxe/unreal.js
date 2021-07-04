import { FPackageIndex } from "./ObjectResource";
import { FName } from "./FName";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";

/**
 * FScriptDelegate
 */
export class FScriptDelegate {
    /**
     * object
     * @type {FPackageIndex}
     * @public
     */
    object: FPackageIndex

    /**
     * functionName
     * @type {FName}
     * @public
     */
    functionName: FName

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates instance using values
     * @param {FPackageIndex} object Object to use
     * @param {FName} functionName Function name to use
     * @constructor
     * @public
     */
    constructor(object: FPackageIndex, functionName: FName)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (x instanceof FAssetArchive) {
            this.object = new FPackageIndex(x)
            this.functionName = x.readFName()
        } else {
            this.object = x
            this.functionName = y
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        this.object.serialize(Ar)
        Ar.writeFName(this.functionName)
    }
}

/**
 * FMulticastScriptDelegate
 */
export class FMulticastScriptDelegate {
    invocationList: FScriptDelegate[]

    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive)

    /**
     * Creates instance using a value
     * @param {Array<FScriptDelegate>} invocationList Invocation list to use
     * @constructor
     * @public
     */
    constructor(invocationList: FScriptDelegate[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any) {
        if (x instanceof FAssetArchive) {
            this.invocationList = x.readArray(() => new FScriptDelegate(x))
        } else {
            this.invocationList = x
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Asset Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeInt32(this.invocationList.length)
        this.invocationList.forEach((it) => it.serialize(Ar))
    }
}