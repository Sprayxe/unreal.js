import { FArchive } from "../reader/FArchive";
import { Aes } from "../../encryption/aes/Aes";
import { FByteArchive } from "../reader/FByteArchive";
import { FIoDirectoryIndexHandle } from "./IoDispatcher";
import { Utils } from "../../util/Utils";
import { Lazy } from "../../util/Lazy";

/**
 * FIoDirectoryIndexEntry
 */
export class FIoDirectoryIndexEntry {
    /**
     * name
     * @type {number}
     * @public
     */
    name = 0xFFFFFFFF

    /**
     * firstChildEntry
     * @type {number}
     * @public
     */
    firstChildEntry = 0xFFFFFFFF

    /**
     * nextSiblingEntry
     * @type {number}
     * @public
     */
    nextSiblingEntry = 0xFFFFFFFF

    /**
     * firstFileEntry
     * @type {number}
     * @public
     */
    firstFileEntry = 0xFFFFFFFF

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.name = Ar.readUInt32()
        this.firstChildEntry = Ar.readUInt32()
        this.nextSiblingEntry = Ar.readUInt32()
        this.firstFileEntry = Ar.readUInt32()
    }
}

/**
 * FIoFileIndexEntry
 */
export class FIoFileIndexEntry {
    /**
     * name
     * @type {number}
     * @public
     */
    name = 0xFFFFFFFF

    /**
     * nextFileEntry
     * @type {number}
     * @public
     */
    nextFileEntry = 0xFFFFFFFF

    /**
     * userData
     * @type {number}
     * @public
     */
    userData = 0

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        this.name = Ar.readUInt32()
        this.nextFileEntry = Ar.readUInt32()
        this.userData = Ar.readUInt32()
    }
}

/**
 * FIoDirectoryIndexResource
 */
export class FIoDirectoryIndexResource {
    /**
     * mountPoint
     * @type {string}
     * @public
     */
    mountPoint: string

    /**
     * directoryEntries
     * @type {Array<FIoDirectoryIndexEntry>}
     * @public
     */
    directoryEntries: FIoDirectoryIndexEntry[]

    /**
     * fileEntries
     * @type {Array<FIoFileIndexEntry>}
     * @public
     */
    fileEntries: FIoFileIndexEntry[]

    /**
     * stringTable
     * @type {Array<string>}
     * @public
     */
    stringTable: string[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const s = Ar.readString()
        this.mountPoint = s.substring(s.indexOf("../../../") + "../../../".length)
        this.directoryEntries = Ar.readArray(() => new FIoDirectoryIndexEntry(Ar))
        this.fileEntries = Ar.readArray(() => new FIoFileIndexEntry(Ar))
        this.stringTable = Ar.readArray(() => Ar.readString())
    }
}

/**
 * FDirectoryIndexVisitorFunction
 */
type FDirectoryIndexVisitorFunction = (filename: string, tocEntryIndex: number) => boolean

/**
 * FIoDirectoryIndexReader
 */
export class FIoDirectoryIndexReader {
    /**
     * Buffer to read
     * @type {Buffer}
     * @public
     */
    buffer: Buffer

    /**
     * Decryption key to use
     * @type {Buffer}
     * @public
     */
    decryptionKey: Buffer

    /**
     * Creates an instance using buffers
     * @param {Buffer} buffer Buffer to read
     * @param {Buffer} decryptionKey Decryption key to use
     * @constructor
     * @public
     */
    constructor(buffer: Buffer, decryptionKey: Buffer) {
        this.buffer = buffer
        this.decryptionKey = decryptionKey
    }

    /**
     * directoryIndex
     * @type {Lazy<FIoDirectoryIndexResource>}
     * @public
     */
    directoryIndex = new Lazy<FIoDirectoryIndexResource>(() => {
        if (!this.buffer.length) {
            throw new Error("Invalid code")
        }
        if (this.decryptionKey) {
            this.buffer = Aes.decrypt(this.buffer, this.decryptionKey)
        }
        return new FIoDirectoryIndexResource(new FByteArchive(this.buffer))
    })

    /**
     * mountPoint
     * @type {string}
     * @public
     */
    get mountPoint() {
        return this.directoryIndex.value.mountPoint
    }

    /**
     * Gets child directory
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} Child directory
     * @public
     */
    getChildDirectory(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && !this.isValidIndex()) {
            return FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).firstChildEntry)
        } else {
            return FIoDirectoryIndexHandle.invalid()
        }
    }

    /**
     * Gets next directory
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} Next directory
     * @public
     */
    getNextDirectory(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            return FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).nextSiblingEntry)
        } else {
            return FIoDirectoryIndexHandle.invalid()
        }
    }

    /**
     * Gets file
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} File
     * @public
     */
    getFile(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            return FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).firstFileEntry)
        } else {
            return FIoDirectoryIndexHandle.invalid()
        }
    }

    /**
     * Gets next file
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexHandle} File
     * @public
     */
    getNextFile(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            return FIoDirectoryIndexHandle.fromIndex(this.getFileEntry(directory).nextFileEntry)
        } else {
            return FIoDirectoryIndexHandle.invalid()
        }
    }

    /**
     * Gets directory name
     * @param {FIoDirectoryIndexHandle} directory Directory to get name from
     * @returns {string} Directory name
     * @public
     */
    getDirectoryName(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            const nameIndex = this.getDirectoryEntry(directory).name
            return this.directoryIndex.value.stringTable[nameIndex]
        } else {
            return ""
        }
    }

    /**
     * Gets file name
     * @param {FIoDirectoryIndexHandle} directory Directory of file to get name from
     * @returns {string} File name
     * @public
     */
    getFileName(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            const nameIndex = this.getFileEntry(directory)?.name
            return this.directoryIndex.value.stringTable[nameIndex]
        } else {
            return ""
        }
    }

    /**
     * Gets file data
     * @param {FIoDirectoryIndexHandle} file File to get data from
     * @returns {number} Data
     * @public
     */
    getFileData(file: FIoDirectoryIndexHandle) {
        if (file.isValid() && this.isValidIndex()) {
            return this.directoryIndex.value.fileEntries[file.toIndex()]?.userData
        } else {
            return ~0
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
    iterateDirectoryIndex(directoryIndexHandle: FIoDirectoryIndexHandle, path: string, visit: FDirectoryIndexVisitorFunction) {
        let file = this.getFile(directoryIndexHandle)
        while (file.isValid()) {
            const tocEntryIndex = this.getFileData(file)
            const fileName = this.getFileName(file)
            if (!fileName)
                break
            const filePath = this.mountPoint + `${path !== "" ? path + "/" : ""}` + fileName
            if (!visit(filePath, tocEntryIndex)) {
                return false
            }
            file = this.getNextFile(file)
        }

        let childDirectory = this.getChildDirectory(directoryIndexHandle)
        while (childDirectory.isValid()) {
            const directoryName = this.getDirectoryName(childDirectory)
            const childDirectoryPath = Utils.pathAppend(path, directoryName)
            if (!this.iterateDirectoryIndex(childDirectory, childDirectoryPath, visit)) {
                return false
            }
            childDirectory = this.getNextDirectory(childDirectory)
        }

        return true
    }

    /**
     * Gets directory entry
     * @param {FIoDirectoryIndexHandle} directory Directory to look in
     * @returns {FIoDirectoryIndexEntry} Entry
     * @private
     */
    private getDirectoryEntry(directory: FIoDirectoryIndexHandle) {
        return this.directoryIndex.value.directoryEntries[directory.toIndex()]
    }

    /**
     * Gets file entry
     * @param {FIoDirectoryIndexHandle} file File to look in
     * @returns {FIoFileIndexEntry} Entry
     * @private
     */
    private getFileEntry(file: FIoDirectoryIndexHandle) {
        return this.directoryIndex.value.fileEntries[file.toIndex()]
    }

    /**
     * Whether valid index
     * @returns {boolean} Result
     * @private
     */
    private isValidIndex() {
        return !!this.directoryIndex.value.directoryEntries?.length
    }
}