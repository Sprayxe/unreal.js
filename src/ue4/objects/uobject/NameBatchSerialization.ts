import { FArchive } from "../../reader/FArchive";
import { Utils } from "../../../util/Utils";
import { FSerializedNameHeader, loadNameHeader } from "./UnrealNames";

export function loadNameBatch(nameDataAr: FArchive, hashDataAr: FArchive)
export function loadNameBatch(nameDataAr: FArchive)
export function loadNameBatch(x?: any, y?: any) {
    if (x && y) {
        const hashDataSize = y.size - y.pos
        if (!Utils.isAligned(hashDataSize, 8))
            throw new Error(`Hashdatasize (${hashDataSize}) must be aligned to 8!`)
        const num = hashDataSize / 8 - 1
        return Utils.getArray(num, () => [loadNameHeader(x)])
    } else {
        const num = x.readInt32()
        if (num === 0)
            return []

        x.skip(4 + 8)
        x.skip(8 * num)
        const headers = Utils.getArray(num, () => [x], FSerializedNameHeader)

        return Utils.getArray(num, (it) => {
            const header = headers[it]
            const len = header.len()
            return [
                header.isUtf16() ?
                    Buffer.from(x.read(len * 2)).toString("utf16le") :
                    Buffer.from(x.read(len)).toString("utf-8")
            ]
        })
    }
}
