"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const StringBuilder_1 = require("./StringBuilder");
class Utils {
    static clamp(self, min, max) {
        return Math.min(Math.max(self, min), max);
    }
    static pathAppend(str1, str2, strLength = str2.length) {
        const data = new StringBuilder_1.StringBuilder(str1);
        const dataNum = data.length;
        if (dataNum > 0 && data[dataNum - 1] !== '/' && data[dataNum - 1] !== '\\') {
            data.append('/');
        }
        if (strLength > 0) {
            const start = (str2[0] === '/' || str2[0] === '\\') ? 1 : 0;
            data.append(str2, start, Math.min(str1.length, strLength));
            //data.append(str2, 0, min(str1.length, strLength))
        }
        return data.toString();
    }
    static isAligned(value, alignment) {
        return (value & (alignment - 1)) <= 0;
    }
    static alignBigInt(value, alignment) {
        const h = value + alignment - 1n & ~(alignment - 1n);
        return Number(h);
    }
    static align(value, alignment) {
        return value + alignment - 1 & ~(alignment - 1);
    }
    static repeat(times, action) {
        let x = 0;
        while (x < times) {
            action(x);
            ++x;
        }
    }
    static toRadians(angdeg) {
        return angdeg * 0.017453292519943295; // DEGREES_TO_RADIANS
    }
    static takeWhile(buf, filter) {
        const bytes = [];
        for (let b = 0; b < buf.length; ++b) {
            const byte = buf[b];
            if (!filter(byte))
                break;
            bytes.push(byte);
        }
        return Buffer.from(bytes);
    }
    static takeWhileStr(str, filter) {
        const loop = str.split("");
        let res = "";
        for (const char of loop) {
            if (!filter(char))
                break;
            res += char;
        }
        return res;
    }
}
exports.Utils = Utils;
