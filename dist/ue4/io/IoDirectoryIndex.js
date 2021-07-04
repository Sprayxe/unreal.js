"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FIoDirectoryIndexReader = exports.FIoDirectoryIndexResource = exports.FIoFileIndexEntry = exports.FIoDirectoryIndexEntry = void 0;
const Aes_1 = require("../../encryption/aes/Aes");
const FByteArchive_1 = require("../reader/FByteArchive");
const IoDispatcher_1 = require("./IoDispatcher");
const Utils_1 = require("../../util/Utils");
/**
 * FIoDirectoryIndexEntry
 */
class FIoDirectoryIndexEntry {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * name
         * @type {number}
         * @public
         */
        this.name = 0xFFFFFFFF;
        /**
         * firstChildEntry
         * @type {number}
         * @public
         */
        this.firstChildEntry = 0xFFFFFFFF;
        /**
         * nextSiblingEntry
         * @type {number}
         * @public
         */
        this.nextSiblingEntry = 0xFFFFFFFF;
        /**
         * firstFileEntry
         * @type {number}
         * @public
         */
        this.firstFileEntry = 0xFFFFFFFF;
        this.name = Ar.readUInt32();
        this.firstChildEntry = Ar.readUInt32();
        this.nextSiblingEntry = Ar.readUInt32();
        this.firstFileEntry = Ar.readUInt32();
    }
}
exports.FIoDirectoryIndexEntry = FIoDirectoryIndexEntry;
/**
 * FIoFileIndexEntry
 */
class FIoFileIndexEntry {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        /**
         * name
         * @type {number}
         * @public
         */
        this.name = 0xFFFFFFFF;
        /**
         * nextFileEntry
         * @type {number}
         * @public
         */
        this.nextFileEntry = 0xFFFFFFFF;
        /**
         * userData
         * @type {number}
         * @public
         */
        this.userData = 0;
        this.name = Ar.readUInt32();
        this.nextFileEntry = Ar.readUInt32();
        this.userData = Ar.readUInt32();
    }
}
exports.FIoFileIndexEntry = FIoFileIndexEntry;
/**
 * FIoDirectoryIndexResource
 */
class FIoDirectoryIndexResource {
    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar) {
        const s = Ar.readString();
        this.mountPoint = s.substring(s.indexOf("../../../") + "../../../".length);
        this.directoryEntries = Ar.readArray(() => new FIoDirectoryIndexEntry(Ar));
        this.fileEntries = Ar.readArray(() => new FIoFileIndexEntry(Ar));
        this.stringTable = Ar.readArray(() => Ar.readString());
    }
}
exports.FIoDirectoryIndexResource = FIoDirectoryIndexResource;
/**
 * FIoDirectoryIndexReader
 */
class FIoDirectoryIndexReader {
    /**
     * Creates an instance using buffers
     * @param {Buffer} buffer Buffer to read
     * @param {Buffer} decryptionKey Decryption key to use
     * @constructor
     * @public
     */
    constructor(buffer, decryptionKey) {
        this.buffer = buffer;
        this.decryptionKey = decryptionKey;
    }
    /**
     * directoryIndex
     * @type {FIoDirectoryIndexResource}
     * @public
     */
    get directoryIndex() {
        if (!this.buffer || !this.buffer.length) {
            throw new Error("Invalid code");
        }
        if (this.decryptionKey) {
            this.buffer = Aes_1.Aes.decrypt(this.buffer, this.decryptionKey);
        }
        return new FIoDirectoryIndexResource(new FByteArchive_1.FByteArchive(this.buffer));
    }
    /**
     * mountPoint
     * @type {string}
     * @public
     */
    get mountPoint() {
        return this.directoryIndex.mountPoint;
    }
    /**
     * Gets child directory
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} Child directory
     * @public
     */
    getChildDirectory(directory) {
        if (directory.isValid() && !this.isValidIndex()) {
            return IoDispatcher_1.FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).firstChildEntry);
        }
        else {
            return IoDispatcher_1.FIoDirectoryIndexHandle.invalid();
        }
    }
    /**
     * Gets next directory
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} Next directory
     * @public
     */
    getNextDirectory(directory) {
        if (directory.isValid() && this.isValidIndex()) {
            return IoDispatcher_1.FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).nextSiblingEntry);
        }
        else {
            return IoDispatcher_1.FIoDirectoryIndexHandle.invalid();
        }
    }
    /**
     * Gets file
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} File
     * @public
     */
    getFile(directory) {
        if (directory.isValid() && this.isValidIndex()) {
            return IoDispatcher_1.FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).firstFileEntry);
        }
        else {
            return IoDispatcher_1.FIoDirectoryIndexHandle.invalid();
        }
    }
    /**
     * Gets next file
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} File
     * @public
     */
    getNextFile(directory) {
        if (directory.isValid() && this.isValidIndex()) {
            return IoDispatcher_1.FIoDirectoryIndexHandle.fromIndex(this.getFileEntry(directory).nextFileEntry);
        }
        else {
            return IoDispatcher_1.FIoDirectoryIndexHandle.invalid();
        }
    }
    /**
     * Gets directory name
     * @param {FIoDirectoryIndexHandle} directory Directory to get name from
     * @returns {string} Directory name
     * @public
     */
    getDirectoryName(directory) {
        if (directory.isValid() && this.isValidIndex()) {
            const nameIndex = this.getDirectoryEntry(directory).name;
            return this.directoryIndex.stringTable[nameIndex];
        }
        else {
            return "";
        }
    }
    /**
     * Gets file name
     * @param {FIoDirectoryIndexHandle} directory Directory of file to get name from
     * @returns {string} File name
     * @public
     */
    getFileName(directory) {
        if (directory.isValid() && this.isValidIndex()) {
            const nameIndex = this.getFileEntry(directory)?.name;
            return this.directoryIndex.stringTable[nameIndex];
        }
        else {
            return "";
        }
    }
    /**
     * Gets file data
     * @param {FIoDirectoryIndexHandle} file File to get data from
     * @returns {number} Data
     * @public
     */
    getFileData(file) {
        if (file.isValid() && this.isValidIndex()) {
            return this.directoryIndex.fileEntries[file.toIndex()]?.userData;
        }
        else {
            return ~0;
        }
    }
    /**
     * Iterates through directory index
     * @param {FIoDirectoryIndexHandle} directoryIndexHandle Directory to iterate through
     * @param {string} path Path to directory
     * @param {FDirectoryIndexVisitorFunction} visit Method to call
     * @returns {boolean}
     * @public
     */
    iterateDirectoryIndex(directoryIndexHandle, path, visit) {
        let file = this.getFile(directoryIndexHandle);
        while (file.isValid()) {
            const tocEntryIndex = this.getFileData(file);
            const fileName = this.getFileName(file);
            if (!fileName)
                break;
            const filePath = this.mountPoint + `${path !== "" ? path + "/" : ""}` + fileName;
            if (!visit(filePath, tocEntryIndex)) {
                return false;
            }
            file = this.getNextFile(file);
        }
        let childDirectory = this.getChildDirectory(directoryIndexHandle);
        while (childDirectory.isValid()) {
            const directoryName = this.getDirectoryName(childDirectory);
            const childDirectoryPath = Utils_1.Utils.pathAppend(path, directoryName);
            if (!this.iterateDirectoryIndex(childDirectory, childDirectoryPath, visit)) {
                return false;
            }
            childDirectory = this.getNextDirectory(childDirectory);
        }
        return true;
    }
    /**
     * Gets directory entry
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexEntry} Entry
     * @private
     */
    getDirectoryEntry(directory) {
        return this.directoryIndex.directoryEntries[directory.toIndex()];
    }
    /**
     * Gets file entry
     * @param {FIoDirectoryIndexHandle} file File to look in
     * @returns {FIoFileIndexEntry} Entry
     * @private
     */
    getFileEntry(file) {
        return this.directoryIndex.fileEntries[file.toIndex()];
    }
    /**
     * Whether valid index
     * @returns {boolean} Result
     * @private
     */
    isValidIndex() {
        return !!this.directoryIndex.directoryEntries?.length;
    }
}
exports.FIoDirectoryIndexReader = FIoDirectoryIndexReader;
