"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFormatContainer = void 0;
const FByteBulkData_1 = require("../../../assets/objects/FByteBulkData");
/**
 * FFormatContainer
 */
class FFormatContainer {
    /**
     * Creates an instance using an UE4 Asset Reader
     * @param {FAssetArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        this.formats = Ar.readTMap(null, () => {
            return {
                key: Ar.readFName(),
                value: new FByteBulkData_1.FByteBulkData(Ar)
            };
        });
    }
    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar) {
        Ar.writeTMap(this.formats, (k, v) => {
            Ar.writeFName(k);
            v.serialize(Ar);
        });
    }
}
exports.FFormatContainer = FFormatContainer;
