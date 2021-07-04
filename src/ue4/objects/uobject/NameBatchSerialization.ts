import { FArchive } from "../../reader/FArchive";
import { Utils } from "../../../util/Utils";
import { FSerializedNameHeader, loadNameHeader } from "./UnrealNames";
import { UnrealArray } from "../../../util/UnrealArray";

/**
 * Loads name batch
 * @param {FArchive} nameDataAr Name data UE4 Reader
 * @param {?FArchive} hashDataAr Hash data UE4 Reader
 * @returns {Array<any>} Name batch
 * @export
 */
export function loadNameBatch(nameDataAr: FArchive, hashDataAr?: FArchive) {
    if (hashDataAr) {
        const hashDataSize = hashDataAr.size - hashDataAr.pos
        if (!Utils.isAligned(hashDataSize, 8))
            throw new Error(`Hashdatasize (${hashDataSize}) must be aligned to 8!`)
        const num = hashDataSize / 8 - 1
        const arr = []
        for (let i = 0; i < num; ++i) {
            arr[i] = loadNameHeader(nameDataAr)
        }
        return arr
    } else {
        const num = nameDataAr.readInt32()
        if (num === 0)
            return []

        nameDataAr.pos += 4 + 8
        nameDataAr.pos += 8 * num
        const headers = new UnrealArray(num, () => new FSerializedNameHeader(nameDataAr))

        return new UnrealArray(num, (it) => {
            const header = headers[it]
            const len = header.len()
            return header.isUtf16()
                ? Buffer.from(nameDataAr.readBuffer(len * 2)).toString("utf16le")
                : Buffer.from(nameDataAr.readBuffer(len)).toString("utf-8")
        })
    }
}
