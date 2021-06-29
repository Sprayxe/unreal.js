import { deserializeVersionedTaggedProperties, serializeProperties, UObject } from "./UObject";
import { UnrealMap } from "../../../util/UnrealMap";
import { FName } from "../../objects/uobject/FName";
import { UScriptStruct } from "./UScriptStruct";
import { FAssetArchive } from "../reader/FAssetArchive";
import { deserializeUnversionedProperties } from "../../objects/uobject/serialization/UnversionedPropertySerialization";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FTableRowBase } from "../../objects/FTableRowBase";
import { mapToClass } from "../util/StructFallbackReflectionUtil";
import { Locres } from "../../locres/Locres";
import { UProperty } from "../../../util/decorators/UProperty";


export class UDataTable extends UObject {
    @UProperty()
    public RowStruct: UScriptStruct = null
    @UProperty()
    public bStripFromClientBuilds?: boolean = null
    @UProperty()
    public bIgnoreExtraFields?: boolean = null
    @UProperty()
    public bIgnoreMissingFields?: boolean = null
    @UProperty()
    public ImportKeyField?: string = null
    @UProperty()
    public rows: UnrealMap<FName, UObject>

    constructor(rows: UnrealMap<FName, UObject> = new UnrealMap<FName, UObject>()) {
        super()
        this.rows = rows
    }

    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.rows = Ar.readTMap(null, () => {
            const key = Ar.readFName()
            const rowProperties = []
            if (Ar.useUnversionedPropertySerialization) {
                deserializeUnversionedProperties(rowProperties, this.RowStruct, Ar)
            } else {
                deserializeVersionedTaggedProperties(rowProperties, Ar)
            }
            const value = new UObject(rowProperties)
            return {key, value}
        })
    }

    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar)
        Ar.writeTMap(this.rows, (key, value) => {
            Ar.writeFName(key)
            serializeProperties(Ar, value.properties)
        })
    }

    findRow(rowName: string | FName) {
        return rowName instanceof FName
            ? this.rows.get(rowName)
            : this.rows.get(FName.dummy(rowName))
    }

    findRowMapped<T extends FTableRowBase>(rowName: FName): T {
        const row = this.findRow(rowName)
        if (!row) return null;
        return mapToClass(row.properties, this.RowStruct.structClass)
    }

    toJson(locres: Locres = null): any {
        return this.rows.map((v, k) => {
            return {key: k.text, value: v.toJson(locres)}
        })
    }
}