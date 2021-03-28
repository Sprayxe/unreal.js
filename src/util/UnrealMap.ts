import Collection from "@discordjs/collection";
import objectHash from "node-object-hash";

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

/**
 * @deprecated
 * This hash map has been deprecated because of it's inefficiency
 */
class DeprecatedUnrealMap<K, V> {
    [Symbol.iterator]<T>() {
        const coll = new Map<K, V>()
        new Array()
            .concat(...this.mapToArray().map(m => m.map(_ => { return { key: _.key, value: _.value } })))
            .forEach(v => coll.set(v.key, v.value))
        return coll.entries()
    }

    private _keyArray: K[] = []
    private _array: V[] = []
    private _map = new Collection<string, UnrealMapHashEntry[]>()

    /**
     * Identical to [Map.set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set).
     * Sets a new element in the collection with the specified key and value.
     * @param {*} key - The key of the element to add
     * @param {*} value - The value of the element to add
     * @returns {Collection}
     */
    public set(key: K, value: V): DeprecatedUnrealMap<K, V> {
        const hash = this.hash(key)
        // get all entries that are stored under this hash
        let list = this._map.get(hash)
        if (!list) {
            list = []
            this._map.set(hash, list)
        }
        // loop thru list and check if the elements already exists
        for (let i = 0; i < list.length; i++) {
            if (list[i].key.equals ? list[i].key.equals(key) : list[i].key === key) {
                list[i].value = value
                return this
            }
        }
        // push entry into array
        list.push({
            key,
            value
        })
        // refresh cache and return this collection
        this.mapToKeyArray(true)
        this.mapToValueArray(true)
        return this
    }

    /**
     * Identical to [Map.get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get).
     * Gets an element with the specified key, and returns its value, or `undefined` if the element does not exist.
     * @param {*} key - The key to get from this collection
     * @returns {* | undefined}
     */
    public get(key: K): V | undefined {
        const ent = this.getEntryByKey(key)
        return ent ? ent.find(e => e.key.equals ? e.key.equals(key) : e.key === key)?.value : undefined
    }

    /**
     * Identical to [Map.get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get).
     * Gets an element with the specified hash key, and returns its value, or `undefined` if the element does not exist.
     * @param {*} key - The key to get from this collection
     * @returns {* | undefined}
     */
    public getByHash(key: string): UnrealMapHashEntry[]  {
        return this._map.get(key)
    }

    /**
     * Identical to [Map.has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has).
     * Checks if an element exists in the collection.
     * @param {*} key - The key of the element to check for
     * @returns {boolean} `true` if the element exists, `false` if it does not exist.
     */
    public has(key: K): boolean {
       return !!this.get(key)
    }

    /**
     * Identical to [Map.has()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has).
     * Checks if a hash element exists in the collection.
     * @param {*} key - The key of the element to check for
     * @returns {boolean} `true` if the element exists, `false` if it does not exist.
     */
    public hasHash(key: string): boolean {
        return !!this.getByHash(key)
    }

    /**
     * Identical to [Map.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete).
     * Deletes an element from the collection.
     * @param {*} key - The key to delete from the collection
     * @returns {boolean} `true` if the element was removed, `false` if the element does not exist.
     */
    public delete(key: K): boolean {
        const hash = this.hash(key)
        const ent1 = this.getEntryByKey(key)
        if (!ent1)
            return false
        const list = ent1.filter(e => e.key.equals ? !e.key.equals(key) : e.key !== key)
        if (list.length)
            this._map.set(hash, list)
        else
            this._map.delete(hash)
        // refresh cache
        this.mapToKeyArray(true)
        this.mapToValueArray(true)
        return true
    }

    /**
     * Identical to [Map.clear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear).
     * Removes all elements from the collection.
     * @returns {undefined}
     */
    public clear(): void {
        this._array = []
        this._keyArray = []
        return this._map.clear()
    }

    /**
     * Creates an ordered array of the values of this collection. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behavior, use `[...collection.values()]` or
     * `Array.from(collection.values())` instead.
     * @returns {Array}
     */
    public values(): V[] {
        return this.mapToValueArray()
    }

    /**
     * Creates an ordered array of the values of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behavior, use `[...collection.values()]` or
     * `Array.from(collection.values())` instead.
     * @returns {Array}
     */
    public array(): V[] {
        return this.mapToValueArray()
    }

    /**
     * Creates an ordered array of the keys of this collection, and caches it internally. The array will only be
     * reconstructed if an item is added to or removed from the collection, or if you change the length of the array
     * itself. If you don't want this caching behavior, use `[...collection.keys()]` or
     * `Array.from(collection.keys())` instead.
     * @returns {Array}
     */
    public keyArray(): K[] {
        return this.mapToKeyArray()
    }

    /**
     * Obtains the first value(s) in this collection.
     * @param {number} [amount] Amount of values to obtain from the beginning
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values, starting from the end if
     * amount is negative
     */
    public first(): V | undefined;
    public first(amount: number): V[];
    public first(amount?: number): V | V[] | undefined {
        if (!this.size) return undefined
        if (typeof amount === "undefined") return this._map.values().next().value[0]?.value
        if (amount < 0) return this.last(amount * -1)
        amount = Math.min(this.size, amount)
        const iter = this._map.values()
        return Array.from({ length: amount }, (v, k) => iter.next().value[k]?.value)
    }

    /**
     * Obtains the first key(s) in this collection.
     * @param {number} [amount] Amount of keys to obtain from the beginning
     * @returns {*|Array<*>} A single key if no amount is provided or an array of keys, starting from the end if
     * amount is negative
     */
    public firstKey(): K | undefined;
    public firstKey(amount: number): K[];
    public firstKey(amount?: number): K | K[] | undefined {
        if (!this.size) return undefined
        if (typeof amount === "undefined") return this._map.values().next().value[0]?.key
        if (amount < 0) return this.lastKey(amount * -1)
        amount = Math.min(this.size, amount)
        const iter = this._map.values()
        return Array.from({ length: amount }, (v, k) => iter.next().value[k]?.key)
    }

    /**
     * Obtains the first hash key(s) in this collection.
     * @param {number} [amount] Amount of keys to obtain from the beginning
     * @returns {*|Array<*>} A single key if no amount is provided or an array of keys, starting from the end if
     * amount is negative
     */
    public firstHashKey(): UnrealMapHashEntry | undefined;
    public firstHashKey(amount: number): UnrealMapHashEntry[];
    public firstHashKey(amount?: number): UnrealMapHashEntry | UnrealMapHashEntry[] | undefined {
        if (!this.size) return undefined
        if (typeof amount === "undefined") return this._map.keys().next().value
        if (amount < 0) return this.lastHashKey(amount * -1)
        amount = Math.min(this.size, amount)
        const iter = this._map.keys()
        return Array.from({ length: amount }, (v, k) => iter.next().value)
    }

    /**
     * Obtains the last value(s) in this collection. This relies on {@link Collection#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of values to obtain from the end
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values, starting from the start if
     * amount is negative
     */
    public last(): V | undefined;
    public last(amount: number): V[];
    public last(amount?: number): V | V[] | undefined {
        const arr = this.mapToValueArray()
        if (typeof amount === "undefined") return [].concat(...arr).pop()
        if (amount < 0) return this.first(amount * -1)
        if (!amount) return []
        return arr.slice(-1)
    }

    /**
     * Obtains the last key(s) in this collection. This relies on {@link Collection#keyArray}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of keys to obtain from the end
     * @returns {*|Array<*>} A single key if no amount is provided or an array of keys, starting from the start if
     * amount is negative
     */
    public lastKey(): K | undefined;
    public lastKey(amount: number): K[];
    public lastKey(amount?: number): K | K[] | undefined {
        const arr = this.mapToKeyArray()
        if (typeof amount === "undefined") return [].concat(...arr).pop()
        if (amount < 0) return this.firstKey(amount * -1)
        if (!amount) return []
        return arr.slice(-1)
    }

    /**
     * Obtains the last hash key(s) in this collection. This relies on {@link Collection#keyArray}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of keys to obtain from the end
     * @returns {*|Array<*>} A single key if no amount is provided or an array of keys, starting from the start if
     * amount is negative
     */
    public lastHashKey(): UnrealMapHashEntry | undefined;
    public lastHashKey(amount: number): UnrealMapHashEntry[];
    public lastHashKey(amount?: number): UnrealMapHashEntry | UnrealMapHashEntry[] | undefined {
        const arr = [].concat(...this._map.keys())
        if (typeof amount === "undefined") return [].concat(...arr).pop()
        if (amount < 0) return this.firstHashKey(amount * -1)
        if (!amount) return []
        return arr.slice(-1)
    }

    /**
     * Obtains unique random value(s) from this collection. This relies on {@link Collection#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of values to obtain randomly
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values
     */
    public random(): V;
    public random(amount: number): V[];
    public random(amount?: number): V | V[] {
        let arr = this.mapToValueArray()
        if (typeof amount === "undefined") return arr[Math.floor(Math.random() * arr.length)]
        if (!arr.length || !amount) return []
        arr = arr.slice()
        return Array.from(
            { length: arr.length },
            () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
        )
    }

    /**
     * Obtains unique random value(s) from this collection. This relies on {@link Collection#array}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of values to obtain randomly
     * @returns {*|Array<*>} A single value if no amount is provided or an array of values
     */
    public randomKey(): K;
    public randomKey(amount: number): K[];
    public randomKey(amount?: number): K | K[] {
        let arr = this.mapToKeyArray()
        if (typeof amount === "undefined") return arr[Math.floor(Math.random() * arr.length)]
        if (!arr.length || !amount) return []
        arr = arr.slice()
        return Array.from(
            { length: arr.length },
            () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]
        )
    }

    /**
     * Obtains unique random key(s) from this collection. This relies on {@link Collection#keyArray}, and thus the caching
     * mechanism applies here as well.
     * @param {number} [amount] Amount of keys to obtain randomly
     * @returns {*|Array<*>} A single key if no amount is provided or an array
     */
    public randomHashKey(): string;
    public randomHashKey(amount: number): string[];
    public randomHashKey(amount?: number): string | string[] {
        let arr = this._map.keyArray()
        if (typeof amount === 'undefined') return arr[Math.floor(Math.random() * arr.length)]
        if (!arr.length || !amount) return []
        arr = arr.slice()
        return Array.from(
            { length: Math.min(amount, arr.length) },
            () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0],
        )
    }

    /**
     * Searches for a single item where the given function returns a truthy value. This behaves like
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * <warn>All collections used in Discord.js are mapped using their `id` property, and if you want to find by id you
     * should use the `get` method. See
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) for details.</warn>
     * @param {Function} fn The function to test with (should return boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {*}
     */
    public find(fn: (value: V, key: K, collection: this) => boolean): V | undefined;
    public find<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): V | undefined;
    public find(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const { key, value } of [].concat(...this.mapToArray())) {
            if (fn(value, key, this)) return value
        }
        return undefined
    }

    /**
     * Searches for a single item where the given function returns a truthy value. This behaves like
     * [Array.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find).
     * <warn>All collections used in Discord.js are mapped using their `id` property, and if you want to find by id you
     * should use the `get` method. See
     * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get) for details.</warn>
     * @param {Function} fn The function to test with (should return boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {*}
     */
    public findKey(fn: (value: V, key: K, collection: this) => boolean): V | undefined;
    public findKey<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): V | undefined;
    public findKey(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): V | undefined {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        for (const { key, value } of [].concat(...this.mapToArray())) {
            if (fn(value, key, this)) return key
        }
        return undefined
    }

    /**
     * Identical to
     * [Array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
     * but returns a Collection instead of an Array.
     * @param {Function} fn The function to test with (should return boolean)
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {UnrealMap}
     */
    public filter(fn: (value: V, key: K, collection: this) => boolean): DeprecatedUnrealMap<K, V>;
    public filter<T>(fn: (this: T, value: V, key: K, collection: this) => boolean, thisArg: T): DeprecatedUnrealMap<K, V>;
    public filter(fn: (value: V, key: K, collection: this) => boolean, thisArg?: unknown): DeprecatedUnrealMap<K, V> {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg)
        const results = new DeprecatedUnrealMap<K, V>() as this
        for (const { key, value } of [].concat(...this.mapToArray())) {
            if (fn(value, key, this)) results.set(key, value)
        }
        return results
    }

    /**
     * Maps each item to another value into an array. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param {Function} fn Function that produces an element of the new array, taking three arguments
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {Array}
     */
    public map<T>(fn: (value: V, key: K, collection: this) => T): T[];
    public map<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): T[];
    public map<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): T[] {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg)
        const iter = this._map.entries()
        return Array.from(
            { length: this.size },
            (): T => {
                const { key, value } = iter.next().value[1][0]
                return fn(value, key, this);
            }
        )
    }

    /**
     * Maps each item to another value into a collection. Identical in behavior to
     * [Array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
     * @param {Function} fn Function that produces an element of the new collection, taking three arguments
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {UnrealMap}
     */
    public mapValues<T>(fn: (value: V, key: K, collection: this) => T): UnrealMap<K, T>;
    public mapValues<This, T>(fn: (this: This, value: V, key: K, collection: this) => T, thisArg: This): UnrealMap<K, T>;
    public mapValues<T>(fn: (value: V, key: K, collection: this) => T, thisArg?: unknown): UnrealMap<K, T> {
        if (typeof thisArg !== 'undefined') fn = fn.bind(thisArg);
        const coll = new UnrealMap<K, T>()
        for (const { key, value } of [].concat(...this.mapToArray())) coll.set(key, fn(value, key, this))
        return coll
    }

    /**
     * Identical to
     * [Map.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach),
     * @param {Function} fn Function to execute for each element
     * @param {*} [thisArg] Value to use as `this` when executing function
     * @returns {void}
     */
    public forEach(fn: (value: V, key: K, collection: this) => void)
    public forEach<T>(fn: (this: T, value: V, key: K, collection: this) => void, thisArg: T)
    public forEach(fn: (value: V, key: K, collection: this) => void, thisArg?: unknown) {
        const coll = new Map<K, V>()
        const src = this.mapToArray().map(m => m.map(_ => { return { key: _.key, value: _.value } }))
        const map = [].concat(...src).forEach((v) => coll.set(v.key, v.value))
        coll.forEach(fn as unknown as (value: V, key: K, map: Map<K, V>) => void, thisArg);
    }

    /**
     * Checks if this collection shares identical items with another.
     * This is different to checking for equality using equal-signs, because
     * the collections may be different objects, but contain the same data.
     * @param {UnrealMap} collection Collection to compare with
     * @returns {boolean} Whether the collections have identical contents
     */
    public equals(collection: DeprecatedUnrealMap<unknown, unknown>): boolean {
        if (!collection) return false // runtime check
        if (this === collection) return true
        if (this.size !== collection.size) return false
        for (const [key, value] of this._map) {
            if (!collection.hasHash(key) || !value.find(v => v.value === collection.get(v.key))) {
                return false
            }
        }
        return true
    }

    get size() {
        return this.array().length
    }

    private getEntryByKey(key: K) {
        const hash = this.hash(key)
        return this._map.get(hash)
    }

    private hash(value: any) {
        return objectHash().hash(value)
    }

    private mapToArray() {
        return this._map.array()
    }

    private mapToValueArray(r?: boolean): V[] {
        if (r || (this._array.length < 1 && this._map.size > 0)) {
            this._array = [].concat(...this.mapToArray().map(m => m.map(_m => _m.value)))
        }
        return this._array
    }

    private mapToKeyArray(r?: boolean): K[] {
        if (r || (this._keyArray.length < 1 && this._map.size > 0)) {
            this._keyArray = [].concat(...this.mapToArray().map(m => m.map(_m => _m.key)))
        }
        return this._keyArray
    }
}

interface UnrealMapHashEntry {
    key: any
    value: any
}
