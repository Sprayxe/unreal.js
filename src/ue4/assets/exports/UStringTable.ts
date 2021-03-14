import { UObject } from "./UObject";
import Collection from "@discordjs/collection";
import { FName } from "../../objects/uobject/FName";
import { FAssetArchive } from "../reader/FAssetArchive";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";


export class UStringTable extends UObject {
    tableNamespace: string
    entries: Collection<string, string>
    keysToMetadata: Collection<string, Collection<FName, string>>

    deserialize(Ar: FAssetArchive, validPos: number) {
        // TODO super.deserialize(Ar, validPos)
        this.tableNamespace = Ar.readString()
        this.entries = Ar.readTMap(null, () => {
            return {
                key: Ar.readString(),
                value: Ar.readString()
            }
        })
        this.keysToMetadata = Ar.readTMap(null, () => {
            const map = new Collection<FName, string>()
            map.set(Ar.readFName(), Ar.readString())
            return {
                key: Ar.readString(),
                value: map
            }
        })
    }

    serialize(Ar: FAssetArchiveWriter) {
        // TODO super.serialize(Ar)
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
}