"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OodleDownloader = void 0;
const axios_1 = __importDefault(require("axios"));
const lzma_native_1 = __importDefault(require("lzma-native"));
const promises_1 = require("fs/promises");
const Exceptions_1 = require("./Exceptions");
/**
 * Handles oo2core_8_win64.dll downloading
 */
class OodleDownloader {
    /**
     * Decompress the response body of the provided url using lzma
     * @param {string} url URL to request data from
     * @returns {Promise<Buffer>} Decompressed body
     * @private
     * @static
     */
    static async lzmaGet(url) {
        return lzma_native_1.default.decompress((await axios_1.default.get(url, { responseType: "arraybuffer" })).data);
    }
    /**
     * Downloads oodle .dll
     * @param {string} path Path to write oodle to
     * @returns {Promise<void>}
     * @public
     * @static
     */
    static async download(path) {
        const index = (await this.lzmaGet(OodleDownloader.CDN_INDEX_URL)).toString();
        let oodleUrl;
        for (const line of index.split("\r\n")) {
            if (line.includes(this.OODLE_FILE_NAME))
                oodleUrl = this.CDN_BASE_URL + line.split(",")[0];
        }
        if (!oodleUrl)
            throw new Exceptions_1.OodleException(`Cannot find ${this.OODLE_FILE_NAME} in CDN index.`);
        await promises_1.writeFile(path, await this.lzmaGet(oodleUrl)); // eh
        console.log(`Successfully downloaded ${this.OODLE_FILE_NAME}!`);
    }
}
exports.OodleDownloader = OodleDownloader;
OodleDownloader.CDN_BASE_URL = "https://origin.warframe.com";
OodleDownloader.CDN_INDEX_URL = `${OodleDownloader.CDN_BASE_URL}/origin/E926E926/index.txt.lzma`;
OodleDownloader.OODLE_FILE_NAME = "oo2core_8_win64.dll";
