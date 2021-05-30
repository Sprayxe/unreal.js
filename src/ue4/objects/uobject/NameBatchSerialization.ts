import { FArchive } from "../../reader/FArchive";
import { Utils } from "../../../util/Utils";
import { FSerializedNameHeader, loadNameHeader } from "./UnrealNames";
import { UnrealArray } from "../../../util/UnrealArray";

export function loadNameBatch(nameDataAr: FArchive, hashDataAr: FArchive)
export function loadNameBatch(nameDataAr: FArchive)
export function loadNameBatch(x?: any, y?: any) {
    if (x && y) {
        const hashDataSize = y.size - y.pos
        if (!Utils.isAligned(hashDataSize, 8))
            throw new Error(`Hashdatasize (${hashDataSize}) must be aligned to 8!`)
        const num = hashDataSize / 8 - 1
        return new UnrealArray(num, () => loadNameHeader(x))
    } else {
        const num = x.readInt32()
        if (num === 0)
            return []

        x.skip(4 + 8)
        x.skip(8 * num)
        const headers = new UnrealArray(num, () => new FSerializedNameHeader(x))

        return new UnrealArray(num, (it) => {
            const header = headers[it]
            const len = header.len()
            return header.isUtf16()
                ? Buffer.from(x.readBuffer(len * 2)).toString("utf16le")
                : Buffer.from(x.readBuffer(len)).toString("utf-8")
        })
    }
}
