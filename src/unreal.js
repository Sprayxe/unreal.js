const fs = require("fs").promises;
const FArchive = require("./helpers/ue4/reader/FArchive");

class UnrealJS {
    constructor (path = "C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Content\\Paks") {
        this.path = path;
        this.FArchive = null;
        this.FIoStoreTocHeader = {};
    };

    async readGlobalUtoc() {
        const UTOC = await fs.readFile(`${this.path}/global.utoc`);
        this.FArchive = new FArchive(UTOC);
        return this.FArchive.read(16); 
    };
};

module.exports =  UnrealJS;

