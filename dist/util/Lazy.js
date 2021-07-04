"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lazy = void 0;
class Lazy {
    constructor(initializer) {
        this.initializer = null;
        this._value = null;
        this.initializer = initializer;
    }
    get value() {
        if (this._value == null) {
            this._value = this.initializer();
            this.initializer = null;
        }
        return this._value;
    }
    get isInitialized() {
        return this._value !== null;
    }
}
exports.Lazy = Lazy;
