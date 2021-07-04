/**
 * Handles oo2core_8_win64.dll downloading
 */
export declare class OodleDownloader {
    private static readonly CDN_BASE_URL;
    private static readonly CDN_INDEX_URL;
    static readonly OODLE_FILE_NAME: string;
    /**
     * Decompress the response body of the provided url using lzma
     * @param {string} url URL to request data from
     * @returns {Promise<Buffer>} Decompressed body
     * @private
     * @static
     */
    private static lzmaGet;
    /**
     * Downloads oodle .dll
     * @param {string} path Path to write oodle to
     * @returns {Promise<void>}
     * @public
     * @static
     */
    static download(path: string): Promise<void>;
}
