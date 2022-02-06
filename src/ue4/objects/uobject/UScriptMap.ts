import { FProperty, ReadType } from "../../assets/objects/FProperty";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { PropertyType } from "../../assets/objects/PropertyType";
import { ParserException } from "../../../exceptions/Exceptions";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
import { UnrealMap } from "../../../util/UnrealMap";

export class UScriptMap {
    numKeysToRemove: FProperty[]
    mapData: UnrealMap<FProperty, FProperty>

    constructor(Ar: FAssetArchive, typeData: PropertyType)
    constructor(numKeyToRemove: FProperty[], mapData: UnrealMap<FProperty, FProperty>)
    constructor(x?: any, y?: any) {
        if (x instanceof FAssetArchive) {
            const numKeysToRemove = x.readInt32()
            this.numKeysToRemove = new Array(numKeysToRemove);
            for (let i = 0; i < numKeysToRemove; ++i) {
                this.numKeysToRemove[i] = FProperty.readPropertyValue(x, y.innerType, ReadType.MAP);
            }
            const length = x.readInt32()
            this.mapData = new UnrealMap<FProperty, FProperty>()
            for (let i = 0; i < length; ++i) {
                let isReadingValue = false
                try {
                    const key = FProperty.readPropertyValue(x, y.innerType, ReadType.MAP)
                    isReadingValue = true
                    const value = FProperty.readPropertyValue(x, y.valueType, ReadType.MAP)
                    this.mapData.set(key, value)
                } catch (e) {
                    throw new ParserException(`Failed to read ${isReadingValue ? "value" : "key"} for index ${i} in map`, x)
                }
            }
        } else {
            this.numKeysToRemove = x
            this.mapData = y
        }
    }

    serialize(Ar: FAssetArchiveWriter) {
        Ar.writeInt32(this.numKeysToRemove.length)
        this.numKeysToRemove.forEach((k) => {
            FProperty.writePropertyValue(Ar, k, ReadType.MAP)
        })
        Ar.writeInt32(this.mapData.size)
        this.mapData.forEach((v, k) => {
            FProperty.writePropertyValue(Ar, k, ReadType.MAP)
            FProperty.writePropertyValue(Ar, v, ReadType.MAP)
        })
    }
}