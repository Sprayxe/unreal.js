const FileProvider = require("./FileProvider");
const GameFile = require("../ue4/pak/GameFile");

class AbstractFileProvider extends FileProvider {
    constructor () {
        super();
        this.globalDataLoaded = false;
    };

    /**
     * - Loads a game file
     * @param {GameFile} file 
     */
    loadGameFile(file) {
        if (!file.isUE4Package() || !file.hasUexp())
            throw new SyntaxError("The provided file is not a package file!");
        
        const uasset = this.saveGameFile(file);
        const uexp = this.saveGameFile(file.uexp);
        const ubulk = file.hasUbulk() ? this.saveGameFile(file.ubulk) : null;
        return new PakPackage(uasset, uexp, ubulk, file.path, this, this.game)
    };
}
module.exports = AbstractFileProvider;