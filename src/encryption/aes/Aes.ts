import * as crypto from "crypto"
import { InvalidAesKeyException } from "../../exceptions/Exceptions";

const BLOCK_SIZE: number = 16
export class Aes {
    static parseKey(key: string): Buffer {
        const data = key.startsWith("0x") ? key.substring(2) : key
        if (data.length !== 32)
            throw InvalidAesKeyException("Given AES key is not properly formatted, needs to be exactly 32 bytes long")

        return Buffer.from(data)
    }

    static decrypt(data: string, key: string) {
        const iv = Buffer.alloc(BLOCK_SIZE)
        const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)

        let decrypted: any = decipher.update(data, "base64", "utf8")
        decrypted += decipher.final()

        return decrypted
    }

    static encrypt(data: string, key: string) {
        const iv = Buffer.alloc(BLOCK_SIZE)
        const cipher = crypto.createDecipheriv("aes-256-gcm", key, iv)

        let encrypted = cipher.update(data, null, "base64")
        encrypted += cipher.final()

        return encrypted
    }
}