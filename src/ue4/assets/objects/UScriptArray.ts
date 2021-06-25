import { FPropertyTag } from "./FPropertyTag";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { FProperty, ReadType } from "./FProperty";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";

/**
 * Script Array
 */
export class UScriptArray {
    /**
     * Inner tag of this array
     * @type {?FPropertyTag}
     * @public
     */
    innerTag: FPropertyTag = null

    /**
     * Content of this array
     * @type {FProperty}
     * @public
     */
    contents: FProperty[]

    /**
     * Creates an instance using an UE4 reader
     * @param {FAssetArchive} Ar Reader to use
     * @param {PropertyType} typeData Data to use
     * @constructor
     * @public
     */
    constructor(Ar: FAssetArchive, typeData: PropertyType)

    /**
     * Creates an instance using FPropertyTag and array content
     * @param {FPropertyTag} innerTag Inner tag of the array
     * @param {Array<FProperty>} contents Content of the array
     */
    constructor(innerTag: FPropertyTag, contents: FProperty[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x?: any, y?: any) {
        if (x instanceof FAssetArchive) {
            const elementCount = x.readInt32()
            const innerType = y.innerType
            const type = innerType.type.text
            if (!x.useUnversionedPropertySerialization && (type === "StructProperty" || type === "ArrayProperty")) {
                this.innerTag = new FPropertyTag(x, false)
            }
            this.contents = new Array(elementCount)
            for (let i = 0; i < elementCount; ++i) {
                const content = FProperty.readPropertyValue(x, this.innerTag?.typeData || innerType, ReadType.ARRAY)
                if (content)
                    this.contents[i] = content
                else
                    console.warn(`Failed to read array content of type ${innerType} at ${x.pos}, index ${i}`)
            }
        } else {
            this.innerTag = x
            this.contents = y
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeInt32(this.contents.length)
        this.innerTag?.serialize(Ar, false)
        this.contents.forEach((it) => {
            FProperty.writePropertyValue(Ar, it, ReadType.ARRAY)
        })
    }

    /**
     * Turns this into a string
     * @returns {string}
     * @public
     */
    toString() {
        return `UScriptArray{size=${this.contents.length}}`
    }
}