/**
 * Array used in unreal.js
 * - DEPRECATED: Lambda may impact performance, use for loop
 * @deprecated
 */
export class UnrealArray<T> extends Array<T> {

    /**
     * Creates an instance using values
     * @param {number} length Length of array
     * @param {any} init Method to call
     * @example new UnrealArray(69, (i) => new SomeIndexClass(i))
     */
    constructor(length: number, init: (index: number) => T) {
        super()
        if (length > 0 && init) {
            for (let i = 0; i < length; ++i) {
                this.push(init(i))
            }
        }
    }
}