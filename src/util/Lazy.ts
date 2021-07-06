export class Lazy<T> {
    private initializer: () => T = null
    private _value: T = null

    constructor(initializer: () => T) {
        this.initializer = initializer
    }

    get value() {
        if (this._value == null) {
            this._value = this.initializer != null ? this.initializer() : null
            this.initializer = null
        }
        return this._value
    }

    get isInitialized() {
        return this._value !== null
    }
}