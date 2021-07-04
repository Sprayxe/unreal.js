"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitSetExtensions = void 0;
const Const_1 = require("./Const");
class BitSetExtensions {
    static indexOfFirst(bitSet, value) {
        const size = this.size(bitSet);
        for (let i = 0; i < size; ++i) {
            if (bitSet.get(i) === Number(value)) {
                return i;
            }
        }
        return Const_1.INDEX_NONE;
    }
    static size(bitSet) {
        const data = bitSet.data;
        return data.length * BitSetExtensions.BITS_PER_WORD;
    }
}
exports.BitSetExtensions = BitSetExtensions;
BitSetExtensions.ADDRESS_BITS_PER_WORD = 6;
BitSetExtensions.BITS_PER_WORD = 1 << BitSetExtensions.ADDRESS_BITS_PER_WORD;
