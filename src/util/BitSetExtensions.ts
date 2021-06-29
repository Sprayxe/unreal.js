import BitSet from "bitset";
import { INDEX_NONE } from "./Const";

export class BitSetExtensions {
    private static ADDRESS_BITS_PER_WORD = 6
    private static BITS_PER_WORD = 1 << BitSetExtensions.ADDRESS_BITS_PER_WORD

    static indexOfFirst(bitSet: BitSet, value: boolean | number) {
        const size = this.size(bitSet)
        for (let i = 0; i < size; ++i) {
            if (bitSet.get(i) === Number(value)) {
                return i
            }
        }
        return INDEX_NONE
    }

    static size(bitSet: BitSet) {
        const data = (bitSet as any).data
        return data.length * BitSetExtensions.BITS_PER_WORD
    }
}