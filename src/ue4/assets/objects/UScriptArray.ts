import { FPropertyTag } from "./FPropertyTag";
import { FAssetArchive } from "../reader/FAssetArchive";
import { PropertyType } from "./PropertyType";
import { FProperty, ReadType } from "./FProperty";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";

export class UScriptArray {
    innerTag: FPropertyTag = null
    contents: FProperty[]

    constructor(Ar: FAssetArchive, typeData: PropertyType)
    constructor(innerTag: FPropertyTag, contents: FProperty[])
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

    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeInt32(this.contents.length)
        this.innerTag?.serialize(Ar, false)
        this.contents.forEach((it) => {
            FProperty.writePropertyValue(Ar, it, ReadType.ARRAY)
        })
    }

    toString() {
        return `UScriptArray{size=${this.contents.length}}`
    }
}