const fs = require("fs").promises;
const PakFileProvider = require("./PakFileProvider");
const { ParserError } = require("../errors/Exceptions");
const UE4Version = new (require("../ue4/versions/Game"));
const defaultPath = "C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Content\\Paks";

class DefaultFileProvider extends PakFileProvider {
    /**
     * 
     * @param {String} gameFolderPath 
     * @param {UE4Version} Ue4Version 
     */
    constructor (gameFolderPath = defaultPath, game = UE4Version.GAME_UE4_LATEST) {
        this.files = [];
        this.unloadedPaks = [];
        this.requiredKeys = [];
        this.keys = [];
        this.mountedPaks = [];
        this.mountedIoStoreReads = [];
        this.isInitiated = false;
        this.folder = gameFolderPath;
        this.game = game;
    };

    async loadDirectory() {
        const dir = await fs.readdir(this.folder);

        if (!this.isInitiated && this.folder.includes("Paks")) {
            const globalTocFile = await fs.readFile(`${dir}\\global.utoc`);
            if (globalTocFile && globalTocFile.length > 0) {
                 // loadGlobalData
            };
        };

        for (const file in dir) {
            if (file.endsWith(".pak")) {
                try {
                    const content = await fs.readFile(`${this.folder}\\${file}`);
                    const reader = new PakFileReader(content, this.game);
                    if (!reader.isEncrypted()) {
                        mount(reader);
                    } else {
                        this.unloadedPaks.push(reader);
                        this.requiredKeys.push(reader.pakInfo.encryptionKeyGuid);
                    };
                } catch (err) {
                    throw new ParserError(err).m;
                };
            } else {
                
            };
        };
    };
};

module.exports = DefaultFileProvider;