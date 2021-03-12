import Collection from "@discordjs/collection";
import { FProperty } from "../../assets/objects/FProperty";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { PropertyType } from "../../assets/objects/PropertyType";

export class UScriptMap {
    numKeysToRemove: number
    mapData: Collection<FProperty, FProperty>

    constructor(Ar: FAssetArchive, typeData: PropertyType)
    constructor(numKeyToRemove: number, mapData: Collection<FProperty, FProperty>)
    constructor(x?: any, y?: any) {
        if (x instanceof FAssetArchive) {
            this.numKeysToRemove = x.readInt32()
            if (this.numKeysToRemove !== 0) {
                let i = 0
                while (i < this.numKeysToRemove) {
                    
                }
            }
        } else {
            this.numKeysToRemove = x
            this.mapData = y
        }
    }
}