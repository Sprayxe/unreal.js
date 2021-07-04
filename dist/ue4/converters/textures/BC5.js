"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBC5 = void 0;
const BufferStream_1 = require("./util/BufferStream");
function getPixelLoc(width, x, y, off) {
    return (y * width + x) * 3 + off;
}
function getZNormal(x, y) {
    const xf = (x / 127.5) - 1.0;
    const yf = (y / 127.5) - 1.0;
    const zval = Math.min(Math.sqrt(Math.max(1.0 - xf * xf - yf * yf, 0.0)), 1.0);
    return Math.floor(zval * 127.0 + 128.0);
}
function readBC5(data, width, height) {
    const res = Buffer.alloc(width * height * 3);
    const bin = new BufferStream_1.BufferStream(data);
    for (let yBlock = 0; yBlock < height / 4; ++yBlock) {
        for (let xBlock = 0; xBlock < width / 4; ++xBlock) {
            const rBytes = decodeBC3Block(bin);
            const gBytes = decodeBC3Block(bin);
            for (let r = 0; r < 16; ++r) {
                const xOff = r % 4;
                const yOff = Math.floor(r / 4);
                res[getPixelLoc(width, xBlock * 4 + xOff, yBlock * 4 + yOff, 0)] = rBytes[r];
            }
            for (let g = 0; g < 16; ++g) {
                const xOff = g % 4;
                const yOff = Math.floor(g / 4);
                res[getPixelLoc(width, xBlock * 4 + xOff, yBlock * 4 + yOff, 1)] = gBytes[g];
            }
            for (let b = 0; b < 16; ++b) {
                const xOff = b % 4;
                const yOff = Math.floor(b / 4);
                const bVal = getZNormal(rBytes[b], gBytes[b]);
                res[getPixelLoc(width, xBlock * 4 + xOff, yBlock * 4 + yOff, 2)] = bVal;
            }
        }
    }
    // bin.close()
    return res;
}
exports.readBC5 = readBC5;
function decodeBC3Block(bin) {
    const ref0 = bin.read();
    const ref1 = bin.read();
    const refSl = new Float32Array(8);
    refSl[0] = ref0;
    refSl[1] = ref1;
    if (ref0 > ref1) {
        refSl[2] = (6.0 * ref0 + 1.0 * ref1) / 7.0;
        refSl[3] = (5.0 * ref0 + 2.0 * ref1) / 7.0;
        refSl[4] = (4.0 * ref0 + 3.0 * ref1) / 7.0;
        refSl[5] = (3.0 * ref0 + 4.0 * ref1) / 7.0;
        refSl[6] = (2.0 * ref0 + 5.0 * ref1) / 7.0;
        refSl[7] = (1.0 * ref0 + 6.0 * ref1) / 7.0;
    }
    else {
        refSl[2] = (4.0 * ref0 + 1.0 * ref1) / 5.0;
        refSl[3] = (3.0 * ref0 + 2.0 * ref1) / 5.0;
        refSl[4] = (2.0 * ref0 + 3.0 * ref1) / 5.0;
        refSl[5] = (1.0 * ref0 + 4.0 * ref1) / 5.0;
        refSl[6] = 0.0;
        refSl[7] = 255.0;
    }
    let indexBlock1 = Buffer.alloc(3);
    bin.read(indexBlock1);
    indexBlock1 = getBC3Indices(indexBlock1);
    let indexBlock2 = Buffer.alloc(3);
    bin.read(indexBlock2);
    indexBlock2 = getBC3Indices(indexBlock2);
    const bytes = Buffer.alloc(16);
    for (let i = 0; i < 8; ++i) {
        const blockValue = indexBlock1[i];
        bytes[7 - i] = refSl[blockValue];
    }
    for (let i = 0; i < 8; ++i) {
        const blockValue = indexBlock2[i];
        bytes[15 - i] = refSl[blockValue];
    }
    return bytes;
}
function getBC3Indices(bufBlock) {
    return Buffer.from([
        ((bufBlock[2] & 224) >> 5),
        ((bufBlock[2] & 28) >> 2),
        (((bufBlock[2] & 3) << 1) | ((bufBlock[1] & 0b1 << 7) >> 7)),
        ((bufBlock[1] & 112) >> 4),
        ((bufBlock[1] & 14) >> 1),
        (((bufBlock[1] & 1) << 2) | ((bufBlock[0] & 0b11 << 6) >> 6)),
        ((bufBlock[0] & 56) >> 3),
        (bufBlock[0] & 7)
    ]);
}
