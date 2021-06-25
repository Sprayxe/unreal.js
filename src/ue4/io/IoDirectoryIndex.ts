import { FArchive } from "../reader/FArchive";
import { Aes } from "../../encryption/aes/Aes";
import { FByteArchive } from "../reader/FByteArchive";
import { FIoDirectoryIndexHandle } from "./IoDispatcher";
import { Utils } from "../../util/Utils";

export class FIoDirectoryIndexEntry {
    name = 0xFFFFFFFF
    firstChildEntry = 0xFFFFFFFF
    nextSiblingEntry = 0xFFFFFFFF
    firstFileEntry = 0xFFFFFFFF

    constructor(Ar: FArchive) {
        this.name = Ar.readUInt32()
        this.firstChildEntry = Ar.readUInt32()
        this.nextSiblingEntry = Ar.readUInt32()
        this.firstFileEntry = Ar.readUInt32()
    }
}

export class FIoFileIndexEntry {
    name = 0xFFFFFFFF
    nextFileEntry = 0xFFFFFFFF
    userData = 0

    constructor(Ar: FArchive) {
        this.name = Ar.readUInt32()
        this.nextFileEntry = Ar.readUInt32()
        this.userData = Ar.readUInt32()
    }
}

export class FIoDirectoryIndexResource {
    mountPoint: string
    directoryEntries: FIoDirectoryIndexEntry[]
    fileEntries: FIoFileIndexEntry[]
    stringTable: string[]

    constructor(Ar: FArchive) {
        const s = Ar.readString()
        this.mountPoint = s.substring(s.indexOf("../../../") + "../../../".length)
        this.directoryEntries = Ar.readArray(() => new FIoDirectoryIndexEntry(Ar))
        this.fileEntries = Ar.readArray(() => new FIoFileIndexEntry(Ar))
        this.stringTable = Ar.readArray(() => Ar.readString())
    }
}

type FDirectoryIndexVisitorFunction = (filename: string, tocEntryIndex: number) => boolean

export class FIoDirectoryIndexReader {
    buffer: Buffer
    decryptionKey: Buffer

    constructor(buffer: Buffer, decryptionKey: Buffer) {
        this.buffer = buffer
        this.decryptionKey = decryptionKey
    }

    get directoryIndex() {
        if (!this.buffer || !this.buffer.length) {
            throw new Error("Invalid code")
        }
        if (this.decryptionKey) {
            this.buffer = Aes.decrypt(this.buffer, this.decryptionKey)
        }
        return new FIoDirectoryIndexResource(new FByteArchive(this.buffer))
    }

    getMountPoint() {
        return this.directoryIndex.mountPoint
    }

    getChildDirectory(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && !this.isValidIndex()) {
            return FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).firstChildEntry)
        } else {
            return FIoDirectoryIndexHandle.invalid()
        }
    }

    getNextDirectory(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            return FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).nextSiblingEntry)
        } else {
            return FIoDirectoryIndexHandle.invalid()
        }
    }

    getFile(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            return FIoDirectoryIndexHandle.fromIndex(this.getDirectoryEntry(directory).firstFileEntry)
        } else {
            return FIoDirectoryIndexHandle.invalid()
        }
    }

    getNextFile(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            return FIoDirectoryIndexHandle.fromIndex(this.getFileEntry(directory).nextFileEntry)
        } else {
            return FIoDirectoryIndexHandle.invalid()
        }
    }

    getDirectoryName(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            const nameIndex = this.getDirectoryEntry(directory).name
            return this.directoryIndex.stringTable[nameIndex]
        } else {
            return ""
        }
    }

    getFileName(directory: FIoDirectoryIndexHandle) {
        if (directory.isValid() && this.isValidIndex()) {
            const nameIndex = this.getFileEntry(directory)?.name
            return this.directoryIndex.stringTable[nameIndex]
        } else {
            return ""
        }
    }

    getFileData(file: FIoDirectoryIndexHandle) {
        if (file.isValid() && this.isValidIndex()) {
            return this.directoryIndex.fileEntries[file.toIndex()]?.userData
        } else {
            return ~0
        }
    }

    iterateDirectoryIndex(directoryIndexHandle: FIoDirectoryIndexHandle, path: string, visit: FDirectoryIndexVisitorFunction) {
        let file = this.getFile(directoryIndexHandle)
        while (file.isValid()) {
            const tocEntryIndex = this.getFileData(file)
            const fileName = this.getFileName(file)
            if (!fileName)
                break
            const filePath = this.getMountPoint() + `${path !== "" ? path + "/" : ""}` + fileName
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

    private getDirectoryEntry(directory: FIoDirectoryIndexHandle) {
        return this.directoryIndex.directoryEntries[directory.toIndex()]
    }

    private getFileEntry(file: FIoDirectoryIndexHandle) {
        return this.directoryIndex.fileEntries[file.toIndex()]
    }

    private isValidIndex() {
        return !!this.directoryIndex.directoryEntries?.length
    }
}