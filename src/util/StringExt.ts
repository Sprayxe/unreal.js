export class StringExt {
    static substringAfter(str: string, after: string) {
        return str.substring(str.indexOf(after) + after.length)
    }
}