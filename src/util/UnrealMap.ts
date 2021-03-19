import Collection from "@discordjs/collection";
import { UnrealMapHashEntry } from "../Types";
import objectHash from "object-hash";
import { Utils } from "./Utils";

export class UnrealMap<K, V> extends Collection<K, V> {
    private _map = new Collection<string, UnrealMapHashEntry[]>()

    set(key, value): this {
        const hash = typeof key === "object" ? objectHash(key) : Utils.hash(`${key}`).toString()
        let list = this._map.get(hash)
        if (!list) {
            list = []
            this._map.set(hash, list)
        }
        let i: number
        for (i = 0; i < list.length; i++) {
            if (list[i].key.equals ? list[i].key.equals(key) : list[i].key === key) {
                list[i].value = value
                return
            }
        }
        list.push({
            key: key,
            value: value
        })
    }

    get(key) {
        const hash = typeof key === "object" ? objectHash(key) : Utils.hash(`${key}`).toString()
        const ent = this._map.get(hash)
        if (!ent)
            return undefined
        return ent.find(e => e.key.equals ? e.key.equals(key) : e.key === key)?.value
    }

    has(key) {
        const hash = typeof key === "object" ? objectHash(key) : Utils.hash(`${key}`).toString()
        const ent = this._map.get(hash)
        if (!ent)
            return false
        return !!ent.find(e => e.key.equals ? e.key.equals(key) : e.key === key)?.value
    }

    
}