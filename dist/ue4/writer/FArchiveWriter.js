"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FArchiveWriter = void 0;
const Exceptions_1 = require("../../exceptions/Exceptions");
const Game_1 = require("../versions/Game");
// lol fix this, its shit lmfaoo
class FArchiveWriter {
    constructor() {
        this.game = Game_1.Game.GAME_UE4(Game_1.Game.LATEST_SUPPORTED_UE4_VERSION);
        this.ver = Game_1.Game.GAME_UE4_GET_AR_VER(this.game);
    }
    writeInt8(i) {
        const bf = Buffer.alloc(1);
        bf.writeInt8(i);
        this.write(bf);
    }
    writeUInt8(i) {
        const bf = Buffer.alloc(1);
        bf.writeUInt8(i);
        this.write(bf);
    }
    writeInt16(i) {
        const bf = Buffer.alloc(2);
        this.littleEndian ? bf.writeInt16LE(i) : bf.writeInt16BE(i);
        this.write(bf);
    }
    writeUInt16(i) {
        const bf = Buffer.alloc(2);
        this.littleEndian ? bf.writeUInt16LE(i) : bf.writeUInt16BE(i);
        this.write(bf);
    }
    writeInt32(i) {
        const bf = Buffer.alloc(4);
        this.littleEndian ? bf.writeInt32LE(i) : bf.writeInt32BE(i);
        this.write(bf);
    }
    writeUInt32(i) {
        const bf = Buffer.alloc(4);
        this.littleEndian ? bf.writeUInt32LE(i) : bf.writeUInt32BE(i);
        this.write(bf);
    }
    writeInt64(i) {
        const bf = Buffer.alloc(8);
        if (this.littleEndian) {
            bf.writeInt32LE(i >> 8, 0); // write the high order bits (shifted over)
            bf.writeInt32LE(i & 0x00ff, 4); // write the low order bits
        }
        else {
            bf.writeInt32BE(i >> 8, 0); // write the high order bits (shifted over)
            bf.writeInt32BE(i & 0x00ff, 4); // write the low order bits
        }
        this.write(bf);
    }
    writeUInt64(i) {
        const bf = Buffer.alloc(8);
        if (this.littleEndian) {
            bf.writeUInt32LE(i >> 8, 0); // write the high order bits (shifted over)
            bf.writeUInt32LE(i & 0x00ff, 4); // write the low order bits
        }
        else {
            bf.writeUInt32BE(i >> 8, 0); // write the high order bits (shifted over)
            bf.writeUInt32BE(i & 0x00ff, 4); // write the low order bits
        }
        this.write(bf);
    }
    writeFloat32(i) {
        const bf = Buffer.alloc(4);
        this.littleEndian ? bf.writeFloatLE(i) : bf.writeFloatBE(i);
        this.write(bf);
    }
    writeDouble(i) {
        const bf = Buffer.alloc(8);
        this.littleEndian ? bf.writeDoubleLE(i) : bf.writeDoubleBE(i);
        this.write(bf);
    }
    writeBoolean(i) {
        i ? this.writeInt32(1) : this.writeInt32(0);
    }
    writeFlag(i) {
        i ? this.writeInt8(1) : this.writeInt8(0);
    }
    writeString(i) {
        if (i.length < -65536 || i.length > 65536)
            throw new Exceptions_1.ParserException(`Invalid String length '${i.length}'`, this);
        if (i) {
            this.writeInt32(i.length + 1);
            this.write(Buffer.from(i));
            this.writeInt8(0);
        }
        else {
            this.writeInt32(0);
        }
    }
    writeFName(name) {
    }
    writeTMapWithoutSize(map, write) {
        map.forEach((v, k) => write(k, v));
    }
    writeTMap(map, write) {
        this.writeInt32(map.size);
        this.writeTMapWithoutSize(map, write);
    }
    writeTArrayWithoutSize(array, write) {
        array.forEach((v) => write(v));
    }
    writeTArray(array, write) {
        this.writeInt32(array.length);
        this.writeTArrayWithoutSize(array, write);
    }
}
exports.FArchiveWriter = FArchiveWriter;
