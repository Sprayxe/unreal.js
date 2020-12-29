const FileProvider = require("../../providers/FileProvider");

const Ue4Version = new (require("../versions/Game"));

class Package {
    /**
     * 
     * @param {String} fileName 
     * @param {FileProvider} provider 
     */
    constructor(fileName, provider) {
        this.fileName = fileName;
        this.provider = provider;
        this.game = provider?.game ? provider.game : Ue4Version.GAME_UE4_LATEST
    }
};
module.exports = Package;