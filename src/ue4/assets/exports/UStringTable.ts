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
            let x = 0
            const y = Ar.readInt32()
            const map = new Collection<string, string>()
            while (x < y) {
                map.set(Ar.readString(), Ar.readString())
                ++x
            }
            return map
        })
        this.keysToMetadata = Ar.readTMap(null, () => {
            let x1 = 0
            const y1 = Ar.readInt32()
            const map1 = new Collection<string, Collection<FName, string>>()
            while (x1 < y1) {
                const str = Ar.readString()
                Ar.readTMap(null, () => {
                    let x2 = 0
                    const y2 = Ar.readInt32()
                    const map2 = new Collection<FName, string>()
                    while (x2 < y2) {
                        map2.set(Ar.readFName(), Ar.readString())
                        ++x2
                    }
                    map1.set(str, map2)
                })
            }
            return map1
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