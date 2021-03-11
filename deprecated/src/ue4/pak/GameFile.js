const CompressionMethod = require("./CompressionMethod");

class GameFile {
    /**
     * - Game file
     * @param {String} path 
     * @param {Number} pos 
     * @param {Number} size 
     */
    constructor(path = "", pos = 0, size = 0, pakEntry = null, mountPrefix = "", pakFileName = "") {
        this.uncompressedSize = 0;
        this.compressionMethod = CompressionMethod.None;
        this.compressedBlocks = [];
        this.compressionBlockSize = 0;
        this.isEncrypted = false;
        this.pakFileName = pakFileName;
        this.ioPackageId = null;
        this.path = path;
        this.pos = pos;
        this.size = size;
        this.mountPrefix = mountPrefix;
        this.pakEntry = pakEntry;
        this.uexp = null;
        this.ubulk = null;
    };

    /**
     * - Gets the file's extension
     */
    getExtension() {
        return this.path.split(".").pop();
    };

    /**
     * - Checks if the file is an ue4 package
     */
    isUE4Package() {
        const ext = this.getExtension();
        return ext === "uasset" || ext === "umap";
    };

    /**
     * - Checks if the file is a locres
     */
    isLocres() {
        return this.getExtension() === "locres";
    };

    /**
     * - Checks if the file is an assetregistry
     */
    isAssetRegistry() {
        const name = this.getName();
        return name.startsWith("AssetRegistry") && name.endsWith(".bin");
    };

    /**
     * - Checks if the file has uexp
     */
    hasUexp() {
        return this.uexp != null;
    };

    /**
     * - Checks if the file has ubulk
     */
    hasUbulk() {
        return this.ubulk != null;
    };

    /**
     * - Checks if the file is compressed
     */
    isCompressed() {
        return this.uncompressedSize != size || this.compressionMethod != CompressionMethod.None;
    };

    /**
     * - Gets the path without extension
     */
    getPathWithoutExtension() {
        return this.path.split(".").shift();
    };

    /**
     * - Gets the files name
     */
    getName() {
        return this.path.split("/").pop();
    };

    /**
     * - Gets the files name
     */
    getNameWithoutExtension() {
        return this.path.split(".").shift();
    };

    /**
     * - To string lol
     */
    toString() {
        return this.path;
    };

    equals(other) {
        if (this === other) return true;
        if (!other) return false;

        if (this.path !== other.path) return false;
        if (this.pos !== other.pos) return false;
        if (this.size !== other.size) return false;
        if (this.uncompressedSize !== other.uncompressedSize) return false;
        if (this.compressionMethod !== other.compressionMethod) return false;

        return true;
    };

    /**
     * - Hash code
     * @author https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
     */
    hashCode() {
        return this.path.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    };
}
module.exports = GameFile;