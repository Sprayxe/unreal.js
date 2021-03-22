import { InvalidAesKeyException } from "../../exceptions/Exceptions";
import { ModeOfOperation } from "aes-js";
import { DataTypeConverter } from "../../util/DataTypeConverter";
import ecb = ModeOfOperation.ecb;

export class Aes {
    static BLOCK_SIZE = 16

    static parseKey(key: string): Buffer {
        const data = key.startsWith("0x") ? key.substring(2) : key
        if (data.length !== 64)
            throw InvalidAesKeyException("Given AES key is not properly formatted, needs to be exactly 64 bytes long")

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