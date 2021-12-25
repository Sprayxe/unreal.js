import { AbstractVfsReader } from "./AbstractVfsReader";
import { VersionContainer } from "../versions/VersionContainer";
import { FGuid } from "../objects/core/misc/Guid";
import { Aes } from "../../encryption/aes/Aes";

export abstract class AbstractAesVfsReader extends AbstractVfsReader {
    protected constructor(path: string, versions: VersionContainer) {
        super(path, versions)
    }

    public abstract get encryptionKeyGuid(): FGuid

    public length: number = 0
    public customEncryption?: CustomEncryption = null
    public aesKey?: Buffer = null

    public abstract get isEncrypted(): boolean

    public encryptedFileCount: number = 0

    public abstract indexCheckBytes(): Buffer

    /**
     * Test all keys from a collection and return the working one if there is one
     */
    public testAesKeys(keys: Iterable<Buffer>): Buffer | null {
        if (!this.isEncrypted)
            return null
        for (const it of keys) {
            if (this.testAesKey(it))
                return it
        }
        return null
    }

    /**
     * Test all keys from a collection and return the working one if there is one
     */
    public testAesKeysStr(keys: Iterable<string>): string | null {
        if (!this.isEncrypted)
            return null
        for (const it of keys) {
            if (this.testAesKeyStr(it))
                return it
        }
        return null
    }

    public testAesKey(key: Buffer): boolean {
        return !this.isEncrypted || AbstractAesVfsReader.testAesKey(this.indexCheckBytes(), key)
    }

    public testAesKeyStr(key: string): boolean {
        return this.testAesKey(Aes.parseKey(key))
    }

    public static testAesKey(bytes: Buffer, key: Buffer): boolean {
        return this.isValidIndex(Aes.decrypt(bytes, key))
    }
}

export interface CustomEncryption {
    decryptData(contents: Buffer, offBytes: number, numBytes: number, reader: AbstractAesVfsReader)
}