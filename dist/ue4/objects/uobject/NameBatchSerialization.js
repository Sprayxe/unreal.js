"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadNameBatch = void 0;
const Utils_1 = require("../../../util/Utils");
const UnrealNames_1 = require("./UnrealNames");
const UnrealArray_1 = require("../../../util/UnrealArray");
/**
 * Loads name batch
 * @param {FArchive} nameDataAr Name data UE4 Reader
 * @param {?FArchive} hashDataAr Hash data UE4 Reader
 * @returns {Array<any>} Name batch
 * @export
 */
function loadNameBatch(nameDataAr, hashDataAr) {
    if (hashDataAr) {
        const hashDataSize = hashDataAr.size - hashDataAr.pos;
        if (!Utils_1.Utils.isAligned(hashDataSize, 8))
            throw new Error(`Hashdatasize (${hashDataSize}) must be aligned to 8!`);
        const num = hashDataSize / 8 - 1;
        const arr = [];
        for (let i = 0; i < num; ++i) {
            arr[i] = UnrealNames_1.loadNameHeader(nameDataAr);
        }
        return arr;
    }
    else {
        const num = nameDataAr.readInt32();
        if (num === 0)
            return [];
        nameDataAr.pos += 4 + 8;
        nameDataAr.pos += 8 * num;
        const headers = new UnrealArray_1.UnrealArray(num, () => new UnrealNames_1.FSerializedNameHeader(nameDataAr));
        return new UnrealArray_1.UnrealArray(num, (it) => {
            const header = headers[it];
            const len = header.len();
            return header.isUtf16()
                ? Buffer.from(nameDataAr.readBuffer(len * 2)).toString("utf16le")
                : Buffer.from(nameDataAr.readBuffer(len)).toString("utf-8");
        });
    }
}
exports.loadNameBatch = loadNameBatch;
