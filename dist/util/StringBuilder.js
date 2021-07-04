"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringBuilder = void 0;
// this is a mess
class StringBuilder {
    constructor(value = "") {
        this.value = [];
        if (typeof value === "number") {
            this.value = new Array(value);
        }
        else {
            this.value.push(value);
        }
    }
    append(value, offset, length) {
        if (offset) {
            if (offset > this.value.length)
                throw new Error(`Cannot insert at position ${offset}, extends the limit of ${this.value.length}`);
            if (length) {
                let x = 0;
                while (x < length) {
                    this.value.splice(offset, 0, value);
                    ++x;
                }
            }
            else {
                this.value.splice(offset, 0, value);
            }
        }
        else {
            this.value.push(value);
        }
        return this;
    }
    toString() {
        return this.value.join("");
    }
    get length() {
        return this.toString().length;
    }
}
exports.StringBuilder = StringBuilder;
