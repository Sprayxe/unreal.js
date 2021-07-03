import { UObject } from "./UObject";
import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { UnrealMap } from "../../../util/UnrealMap";
import { Locres } from "../../locres/Locres";

/**
 * Represents UE4 String Table
 * @extends {UObject}
 */
export class UStringTable extends UObject {
    /**
     * Namespace of table
     * @type {string}
     * @public
     */
    tableNamespace: string = null

    /**
     * Table entries
     * @type {UnrealMap<string, string>}
     * @public
     */
    entries: UnrealMap<string, string> = null

    /**
     * Keys to meta data
     * @type {UnrealMap<string, UnrealMap<FName, string>>}
     * @public
     */
    keysToMetadata: UnrealMap<string, UnrealMap<FName, string>> = null

    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)
        this.tableNamespace = Ar.readString()
        this.entries = Ar.readTMap(null, () => {
            return {
                key: Ar.readString(),
                value: Ar.readString()
            }
        })
        this.keysToMetadata = Ar.readTMap(null, () => {
            const map = new UnrealMap<FName, string>()
            map.set(Ar.readFName(), Ar.readString())
            return {
                key: Ar.readString(),
                value: map
            }
        })
    }

    /**
     * Serialize this
     * @param {FAssetArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FAssetArchiveWriter) {
        super.serialize(Ar)
        Ar.writeString(this.tableNamespace)
        Ar.writeTMap(this.entries, (key, value) => {
            Ar.writeString(key)
            Ar.writeString(value)
        })
        Ar.writeTMap(this.keysToMetadata, (key, value) => {
            Ar.writeString(key)
            Ar.writeTMap(value, (metaKey, metaValue) => {
                Ar.writeFName(metaKey)
                Ar.writeString(metaValue)
            })
        })
    }

    /**
     * Turns this into json
     * @param {Locres} locres Locres to use
     * @returns {any} Json
     * @public
     */
    toJson(locres: Locres = null): any {
        const obj = {}
        obj["tableNamespace"] = this.tableNamespace
        obj["entries"] = {}
        obj["keysToMetadata"] = {}
        this.entries.forEach((v, k) => {
            obj["entries"][k] = v
        })
        this.keysToMetadata.forEach((v, k) => {
            obj["keysToMetadata"][k] = {}
            v.forEach((v2, k2) => {
                obj["keysToMetadata"][k][k2.toString()] = v2
            })
        })
        return obj
    }
}