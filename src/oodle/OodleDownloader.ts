import axios from "axios";
import lzma from "lzma-native";
import { writeFile } from "fs/promises";
import { OodleException } from "./Exceptions";

/**
 * Handles oo2core_8_win64.dll downloading
 */
export class OodleDownloader {
    private static readonly CDN_BASE_URL: string = "https://origin.warframe.com"
    private static readonly CDN_INDEX_URL: string = `${OodleDownloader.CDN_BASE_URL}/origin/E926E926/index.txt.lzma`
    public static readonly OODLE_FILE_NAME: string = "oo2core_8_win64.dll"

    /**
     * Decompress the response body of the provided url using lzma
     * @param {string} url URL to request data from
     * @returns {Promise<Buffer>} Decompressed body
     * @private
     * @static
     */
    private static async lzmaGet(url: string): Promise<Buffer> {
        return lzma.decompress((await axios.get(url, {responseType: "arraybuffer"})).data)
    }

    /**
     * Downloads oodle .dll
     * @param {string} path Path to write oodle to
     * @returns {Promise<void>}
     * @public
     * @static
     */
    public static async download(path: string): Promise<void> {
        const index = (await this.lzmaGet(OodleDownloader.CDN_INDEX_URL)).toString()
        let oodleUrl: string
        for (const line of index.split("\r\n")) {
            if (line.includes(this.OODLE_FILE_NAME))
                oodleUrl = this.CDN_BASE_URL + line.split(",")[0]
        }
        if (!oodleUrl)
            throw new OodleException(`Cannot find ${this.OODLE_FILE_NAME} in CDN index.`)
        await writeFile(path, await this.lzmaGet(oodleUrl)) // eh
        console.log(`Successfully downloaded ${this.OODLE_FILE_NAME}!`)
    }
}
