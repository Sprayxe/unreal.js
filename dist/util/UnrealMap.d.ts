import Collection from "@discordjs/collection";
export declare class UnrealMap<K, V> extends Collection<K, V> {
    get(key: K): V | undefined;
    delete(key: K): boolean;
}
