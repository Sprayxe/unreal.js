"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnrealArray = void 0;
class UnrealArray extends Array {
    constructor(length, init) {
        super();
        if (length > 0 && init) {
            for (let i = 0; i < length; ++i) {
                this.push(init(i));
            }
        }
    }
}
exports.UnrealArray = UnrealArray;
