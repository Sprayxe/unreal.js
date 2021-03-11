const FileProvider = require("../../providers/FileProvider");
const Ue4Version = require("../versions/Game");
const LATEST = new Ue4Version().LATEST_SUPPORTED_UE4_VERSION;

class Package {
    /**
     * 
     * @param {String} fileName 
     * @param {FileProvider} provider 
     * @param {Number} game 
     */
    constructor(fileName, provider = null, game = provider?.game ? LATEST : provider.game) {
        this.fileName = fileName;
        this.provider = provider;
        this.game = game;
        this.exportsLazy = [];
        this.exports = this.exportsLazy.map(it => it.value);
        this.packageFlags = 0;
    };

    constructExport(struct) {
        const current = struct;
        while (current != null) {
            
        }
    }
}

module.exports = Package;