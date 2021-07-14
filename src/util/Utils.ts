import { StringBuilder } from "./StringBuilder";

export class Utils {
    static clamp(self: number, min: number, max: number) {
        return Math.min(Math.max(self, min), max)
    }

    static pathAppend(str1: string, str2: string, strLength: number = str2.length) {
        const data = new StringBuilder(str1)
        const dataNum = data.length
        if (dataNum > 0 && data[dataNum - 1] !== '/' && data[dataNum - 1] !== '\\') {
            data.append('/')
        }
        if (strLength > 0) {
            const start = (str2[0] === '/' || str2[0] === '\\') ? 1 : 0
            data.append(str2, start, Math.min(str1.length, strLength))
            //data.append(str2, 0, min(str1.length, strLength))
        }
        return data.toString()
    }

    static isAligned(value: number, alignment: number) {
        return (value & (alignment - 1)) <= 0
    }

    static alignBigInt(value: bigint, alignment: bigint) {
        const h = value + alignment - 1n & ~(alignment - 1n)
        return Number(h)
    }

    static align(value: number, alignment: number) {
        return value + alignment - 1 & ~(alignment - 1)
    }

    static repeat(times: number, action: (n: number) => void) {
        let x = 0
        while (x < times) {
            action(x)
            ++x
        }
    }

    static toRadians(angdeg: number) {
        return angdeg * 0.017453292519943295 // DEGREES_TO_RADIANS
    }

    static takeWhile(buf: Buffer, filter: (byte: number) => boolean) {
        const bytes = []
        for (let b = 0; b < buf.length; ++b) {
            const byte = buf[b]
            if (!filter(byte))
                break
            bytes.push(byte)
        }
        return Buffer.from(bytes)
    }

    static takeWhileStr(str: string, filter: (char: string) => boolean) {
        const loop = str.split("")
        let res = ""
        for (const char of loop) {
            if (!filter(char))
                break
            res += char
        }
        return res
    }

    static divideAndRoundUp(int: number, divisor: number) {
        return Math.floor((int + divisor - 1) / divisor)
    }
}