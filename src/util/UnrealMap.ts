import Collection from "@discordjs/collection";

export class UnrealMap<K, V> extends Collection<K, V> {
    get(key: K): V | undefined {
        if ((key as any).equals) {
            return super.find((v, k: any) => k.equals(key))
        } else {
            return super.get(key)
        }
    }

    delete(key: K): boolean {
        if ((key as any).equals) {
            const backup = this
            this.clear()
            backup
                .filter((v, k: any) => !k.equals(key))
                .forEach((v, k) => this.set(k, v))
            return this.size !== backup.size
        } else {
            return super.delete(key)
        }
    }
}
