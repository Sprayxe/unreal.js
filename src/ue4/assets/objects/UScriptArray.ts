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
            let i = 0
            while (i < elementCount) {
                const content = FProperty.readPropertyValue(x, this.innerTag?.typeData || innerType, ReadType.ARRAY)
                if (content)
                    this.contents.push(content)
                else
                    console.warn(`Failed to read array content of type ${innerType} at ${x.pos()}, index ${i}`)
                ++i
            }
        } else {
            this.innerTag = x
            this.contents = y
        }
    }

    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeInt32(this.contents.length)
        // TODO this.innerTag?.serialize(Ar, false)
        this.contents.forEach((it) => {
            FProperty.writePropertyValue(Ar, it, ReadType.ARRAY)
        })
    }

    toString() {
        return `UScriptArray{size=${this.contents.length}}`
    }
}