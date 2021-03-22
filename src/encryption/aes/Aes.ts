import { InvalidAesKeyException } from "../../exceptions/Exceptions";
import { ModeOfOperation } from "aes-js";
import ecb = ModeOfOperation.ecb;
import { DataTypeConverter } from "../../util/DataTypeConverter";

export const BLOCK_SIZE: number = 16
export class Aes {
    static iv = Buffer.alloc(BLOCK_SIZE)

    static parseKey(key: string): Buffer {
        const data = key.startsWith("0x") ? key.substring(2) : key
        if (data.length !== 32)
            throw InvalidAesKeyException("Given AES key is not properly formatted, needs to be exactly 32 bytes long")

        return DataTypeConverter.parseHexBinary(data)
    }

    static decrypt(data: Buffer, key: Buffer) {
        const aesEcb = new ecb(key)
        return Buffer.from(aesEcb.decrypt(data))
    }

    static encrypt(data: Buffer, key: Buffer) {
        const aesEcb = new ecb(key)
        return Buffer.from(aesEcb.encrypt(data))
    }
}