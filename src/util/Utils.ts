import { StringBuilder } from "./StringBuilder";

export class Utils {
    static hash(str: string) {
        let hash = 0, i, chr;
        if (str.length === 0)
            return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
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
}