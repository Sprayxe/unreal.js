"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UEnum = exports.ECppForm = void 0;
const UObject_1 = require("./UObject");
/**
 * How this enum is declared in C++, affects the internal naming of enum values
 * @enum
 */
var ECppForm;
(function (ECppForm) {
    ECppForm["Regular"] = "Regular";
    ECppForm["Namespaced"] = "Namespaced";
    ECppForm["EnumClass"] = "EnumClass";
})(ECppForm = exports.ECppForm || (exports.ECppForm = {}));
/**
 * UEnum
 * @extends {UObject}
 */
class UEnum extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * List of pairs of all enum names and values
         * @type {Array<Pair<FName, number>>}
         * @public
         */
        this.names = null;
        /**
         * How the enum was originally defined
         * @type {ECppForm}
         * @public
         */
        this.cppForm = null;
    }
    /**
     * Deserializes this
     * @param {FAssetArchive} Ar UE4 Asset Reader to use
     * @param {number} validPos End position of reader
     * @returns {void}
     * @public
     */
    deserialize(Ar, validPos) {
        super.deserialize(Ar, validPos);
        this.names = Ar.readArray(() => {
            return {
                key: Ar.readFName(),
                value: Number(Ar.readInt64())
            };
        });
        this.cppForm = Object.values(ECppForm)[Ar.readUInt8()];
    }
}
exports.UEnum = UEnum;
