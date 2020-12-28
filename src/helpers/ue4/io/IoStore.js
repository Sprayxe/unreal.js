const FArchive = require("../reader/FArchive");

class FIoStoreTocHeader {
    /**
     * - Header
     * @param {FArchive} Ar 
     */
    constructor(Ar) {
        this.TOC_MAGIC_IMG = "-==--==--==--==-";
        this.tocMagic = 16;

        Ar.read(tocMagic);
        if (!this.checkMagic()) {
            throw new Error("UTOC Magic is invalid!")
        };

        this.tocHeaderSize = Ar.readInt32();
        this.tocEntryCount = Ar.readInt32();
        this.tocCompressedBlockEntryCount = Ar.readInt32();
        this.tocCompressedBlockEntrySize = Ar.readInt32();
        this.compressionMethodNameCount = Ar.readInt32();
        this.compressionMethodNameLength = Ar.readInt32();
        this.compressionBlockSize = Ar.readInt32();
        this.directoryIndexSize = Ar.readInt64();
        this.containerId = "FIoContainerId";
        this.encryptionKeyGuid = "FGuid";
        this.containerFlags = Ar.readInt32();
    };

    makeMagic() {
        this.tocMagic = Buffer.from(this.TOC_MAGIC_IMG);
    };

    checkMagic() {
        return this.tocMagic === Buffer.from(this.TOC_MAGIC_IMG);
    };
}

