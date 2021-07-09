import BitSet from "bitset";
import { INDEX_NONE } from "./Const";

export class BitSetExt {
    private static ADDRESS_BITS_PER_WORD = 6
    private static BITS_PER_WORD = 1 << BitSetExt.ADDRESS_BITS_PER_WORD

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
        return data.length * BitSetExt.BITS_PER_WORD
    }
}