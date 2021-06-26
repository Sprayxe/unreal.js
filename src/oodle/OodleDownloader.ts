import axios from 'axios';
import lzma from 'lzma-native';
import fs from 'fs';

/**
 * Class that handles oo2core_8_win64.dll downloading
 */
export class OodleDownloader {
  private static readonly CDN_BASE_URL: string = "https://origin.warframe.com"
  private static readonly CDN_INDEX_URL: string = `${OodleDownloader.CDN_BASE_URL}/origin/E926E926/index.txt.lzma`
  public static readonly OODLE_FILE_NAME: string = "oo2core_8_win64.dll"

  private static async lzmaGet(url: string): Promise<Buffer> {
    return lzma.decompress((await axios.get(url, { responseType: "arraybuffer" })).data)
  }

  public static async download(path: string): Promise<void> {
    const index = (await OodleDownloader.lzmaGet(OodleDownloader.CDN_INDEX_URL)).toString()
    let oodleUrl
    for (const line of index.split('\r\n')) {
      if (line.includes(OodleDownloader.OODLE_FILE_NAME)) oodleUrl = OodleDownloader.CDN_BASE_URL + line.split(",")[0]
    }

    if (!oodleUrl) throw new Error(`Cannot find ${OodleDownloader.OODLE_FILE_NAME} in CDN index.`)
    fs.writeFileSync(path, await OodleDownloader.lzmaGet(oodleUrl)) // eh
    console.log(`Successfully downloaded ${OodleDownloader.OODLE_FILE_NAME}!`)
  }
}
