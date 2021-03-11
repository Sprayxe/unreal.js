import { FArchive } from "../../../reader/FArchive";

export enum Guid {
    /**
     * 32 digits.
     *
     * For example: "00000000000000000000000000000000"
     */
    Digits = "Digits",

    /**
     * 32 digits separated by hyphens.
     *
     * For example: 00000000-0000-0000-0000-000000000000
     */
    DigitsWithHyphens = "DigitsWithHyphens",

    /**
     * 32 digits separated by hyphens and enclosed in braces.
     *
     * For example: {00000000-0000-0000-0000-000000000000}
     */
    DigitsWithHyphensInBraces = "DigitsWithHyphensInBraces",

    /**
     * 32 digits separated by hyphens and enclosed in parentheses.
     *
     * For example: (00000000-0000-0000-0000-000000000000)
     */
    DigitsWithHyphensInParentheses = "DigitsWithHyphensInParentheses",

    /**
     * Comma-separated hexadecimal values enclosed in braces.
     *
     * For example: {0x00000000,0x0000,0x0000,{0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00}}
     */
    HexValuesInBraces = "HexValuesInBraces",

    /**
     * This format is currently used by the FUniqueObjectGuid class.
     *
     * For example: 00000000-00000000-00000000-00000000
     */
    UniqueObjectGuid = "UniqueObjectGuid",

    /**
     * Base64 characters with dashes and underscores instead of pluses and slashes (respectively)
     *
     * For example: AQsMCQ0PAAUKCgQEBAgADQ
     */
    Short = "Short",

    /**
     * Base-36 encoded, compatible with case-insensitive OS file systems (such as Windows).
     *
     * For example: 1DPF6ARFCM4XH5RMWPU8TGR0J
     */
    Base36Encoded = "Base36Encoded"
}

class FGuid {
    static mainGuid = new FGuid()

    /** Holds the first component. */
    a: number

    /** Holds the second component. */
    b: number

    /** Holds the third component. */
    c: number

    /** Holds the fourth component. */
    d: number

    constructor()
    constructor(Ar: FArchive)
    constructor(a: number, b: number, c: number, d: number)
    constructor(hexString: string)
    constructor(...params) {
        if (!params.length) {
            this.a = 0
            this.b = 0
            this.c = 0
            this.d = 0
        } else if (params.length === 4) {
            const x = (i: number) => params[i]
            this.a = x(0)
            this.b = x(1)
            this.c = x(2)
            this.d = x(3)
        } else {
            const x = params[0]
            if (x instanceof FArchive) {
                this.a = x.readUInt32()
                this.b = x.readUInt32()
                this.c = x.readUInt32()
                this.d = x.readUInt32()
            } else {
                //const ar = Buffer.from()
            }
        }
    }
}