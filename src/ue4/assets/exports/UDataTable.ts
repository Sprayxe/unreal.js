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

/**
 * Represents an UE4 Data Table
 * @extends {UObject}
 */
export class UDataTable extends UObject {
    /**
     * Struct of rows
     * @type {UScriptStruct}
     * @public
     */
    @UProperty()
    public RowStruct: UScriptStruct = null

    /**
     * Whether strip from client builds
     * @type {?boolean}
     * @public
     */
    @UProperty()
    public bStripFromClientBuilds?: boolean = null

    /**
     * Whether ignore extra fields
     * @type {?boolean}
     * @public
     */
    @UProperty()
    public bIgnoreExtraFields?: boolean = null

    /**
     * Whether ignore missing fields
     * @type {?boolean}
     * @public
     */
    @UProperty()
    public bIgnoreMissingFields?: boolean = null

    /**
     * Import key fields
     * @type {?string}
     * @public
     */
    @UProperty()
    public ImportKeyField?: string = null

    /**
     * Table rows
     * @type {UnrealMap<FName, UObject>}
     * @public
     */
    @UProperty()
    public rows: UnrealMap<FName, UObject>

    /**
     * Creates an instance using rows
     * @param {?UnrealMap<FName, UObject>} rows Rows to apply
     * @constructor
     * @public
     */
    constructor(rows: UnrealMap<FName, UObject> = new UnrealMap<FName, UObject>()) {
        super()
        this.rows = rows
    }

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.rows = new UnrealMap<FName, UObject>()
        const len = Ar.readInt32()
        for (let i = 0; i < len; ++i) {
            const key = Ar.readFName()
            const rowProperties = []
            if (Ar.useUnversionedPropertySerialization) {
                deserializeUnversionedProperties(rowProperties, this.RowStruct, Ar)
            } else {
                deserializeVersionedTaggedProperties(rowProperties, Ar)
            }
            const value = new UObject(rowProperties)
            this.rows.set(key, value)
        }
    }

    /**
     * Serializes this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar)
        Ar.writeTMap(this.rows, (key, value) => {
            Ar.writeFName(key)
            serializeProperties(Ar, value.properties)
        })
    }

    /**
     * Finds a row
     * @param {string} rowName Name of row to find
     * @returns {?UObject} Row or null
     * @public
     */
    findRow(rowName: string | FName) {
        return rowName instanceof FName
            ? this.rows.get(rowName)
            : this.rows.get(FName.dummy(rowName))
    }

    /**
     * Finds a row mapped (maps properties to object)
     * @param {string} rowName Name of row to find
     * @returns {?any} Row or null
     * @public
     */
    findRowMapped<T extends FTableRowBase>(rowName: FName): T {
        const row = this.findRow(rowName)
        if (!row) return null;
        return mapToClass(row.properties, this.RowStruct.structClass)
    }

    /**
     * Turns this into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres: Locres = null): any {
        return this.rows.map((v, k) => {
            return {key: k.text, value: v.toJson(locres)}
        })
    }
}