import { StringBuilder } from "./StringBuilder";

export class DataTypeConverter {
    static parseHexBinary(str: string) {
        return Buffer.from(str, "hex")
        /*const len = str.length
        if (len % 2 !== 0)
            throw new Error(`hexBinary needs to be even-length: ${str}`)
        const out = Buffer.alloc(len / 2)
        for (let i = 0; i < len; i += 2) {
            const h = this.hexToBin(str[i])
            const l = this.hexToBin(str[i + 1])
            if (h === -1 || l === -1) 
                throw new Error(`contains illegal character for hexBinary: ${str}`)
            out[i / 2] = h * 16 + l
        }
        return out*/
    }

    private static hexCode = "0123456789ABCDEF".split("")

    static printHexBinary(buf: Buffer) {
        const r = new StringBuilder(buf.length * 2)
        for (const b of buf) {
            r.append(this.hexCode[b >> 4 & 0xF])
            r.append(this.hexCode[b & 0xF])
        }
        return r.toString()
    }

    static printAesKey(buf: Buffer) {
        return `0x${this.printHexBinary(buf)}`
    }

    private static hexToBin(hex: string) {
        return parseInt(parseInt(hex, 16).toString(2))
    }
}
