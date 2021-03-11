const FAssetArchive = require("../reader/FAssetArchive");
const UStruct = require("./UStruct");

class UObject {
    constructor () {
        this.properties = [];
        this.name = "";
        /** @type {UObject} */
        this.outer = null;
        /** @type {UStruct} */
        this.clazz = null;
        this.objectGuid = null;
        this.flags = 0;
        
        this.export = null;
        this.exportType = this.clazz?.name ? this.clazz.name : "UObject";
    };
    get owner() {
        let current = this.outer;
        let next = current?.outer;
        while (next != null) {
            current = next;
            next = current.outer;
        };
        return current;
    };

    /**
     * - Deserializes
     * @param {FAssetArchive} Ar 
     * @param {Number} validPos 
     */
    deserialize(Ar, validPos) {
        this.properties = [];
        if (typeof(this) != "UClassReal") {
            if (Ar.useUnversionedPropertySerialization) {

            } else {

            };
        };

        if (Ar.pos + 4 <= validPos && Ar.readBoolean() && Ar.pos + 16 <= validPos) {
            this.objectGuid = FGuid(Ar);
        };

        
    };
};

module.exports = UObject;