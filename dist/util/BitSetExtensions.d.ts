import BitSet from "bitset";
export declare class BitSetExtensions {
    private static ADDRESS_BITS_PER_WORD;
    private static BITS_PER_WORD;
    static indexOfFirst(bitSet: BitSet, value: boolean | number): number;
    static size(bitSet: BitSet): number;
}
