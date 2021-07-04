import { FProperty } from "../../assets/objects/FProperty";
import { FAssetArchive } from "../../assets/reader/FAssetArchive";
import { PropertyType } from "../../assets/objects/PropertyType";
import { FAssetArchiveWriter } from "../../assets/writer/FAssetArchiveWriter";
import { UnrealMap } from "../../../util/UnrealMap";
export declare class UScriptMap {
    numKeysToRemove: number;
    mapData: UnrealMap<FProperty, FProperty>;
    constructor(Ar: FAssetArchive, typeData: PropertyType);
    constructor(numKeyToRemove: number, mapData: UnrealMap<FProperty, FProperty>);
    serialize(Ar: FAssetArchiveWriter): void;
}
