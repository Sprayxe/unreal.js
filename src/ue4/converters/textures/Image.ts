import { createCanvas } from "canvas"
import { FTexture2DMipMap, FTexturePlatformData, UTexture2D } from "../../assets/exports/tex/UTexture2D";
import * as dxt from "dxt-js"
import { readBC5 } from "./BC5";

export class Image {
    static convert(tex: UTexture2D, texture?: FTexturePlatformData, mip?: FTexture2DMipMap): Buffer {
        if (!texture) {
            texture = tex.getFirstTexture()
            return this.convert(tex, texture, mip || texture.getFirstLoadedMip())
        }

        const data = mip.data.data
        const width = mip.sizeX
        const height = mip.sizeY
        const formatElement = PixelFormatInfo[texture.pixelFormat] as PixelFormatInfo
        if (!formatElement)
            throw new Error(`Unknown pixel format: ${texture.pixelFormat}`)

        const pixelSize = formatElement.float ? 16 : 4
        const size = width * height * pixelSize
        const dst = Buffer.alloc(size)
        const format = formatElement.pixelFormat

        // i hate javascript switch/case, it sucks, looks better than if/else tho
        switch (format) {
            case "PF_RGB8":
                let d = 0;
                let s = 0;
                for (let i = 0; i < width * height; ++i) {
                    // BGRA -> RGBA
                    dst[d] = data[s + 2]
                    dst[d + 1] = data[s + 1]
                    dst[d + 2] = data[s]
                    dst[d + 3] = 255
                    d += 4
                    s += 3
                }
                break
            case "PF_R8G8B8A8":
            case "PF_RGBA8":
                data.copy(dst, 0, 0, width * height * 4)
                break
            case "PF_BGRA8":
            case "PF_B8G8R8A8":
                let d0 = 0;
                let s0 = 0;
                for (let i0 = 0; i0 < width * height; ++i0) {
                    // BGRA -> RGBA
                    dst[d0] = data[s0 + 2]
                    dst[d0 + 1] = data[s0 + 1]
                    dst[d0 + 2] = data[s0]
                    dst[d0 + 3] = data[s0 + 3]
                    d0 += 4
                    s0 += 4
                }
                break
            case "PF_RGBA4":
                let d1 = 0;
                let s1 = 0;
                for (let i1 = 0; i1 < width * height; ++i1) {
                    const b1 = data[s1]
                    const b2 = data[s1 + 1]
                    // BGRA -> RGBA
                    dst[d1] = b2 & 0xF0
                    dst[d1 + 1] = (b2 & 0xF) << 4
                    dst[d1 + 2] = b1 & 0xF0
                    dst[d1 + 3] = (b1 & 0xF) << 4
                    d1 += 4
                    s1 += 2
                }
                break
            case "PF_G8":
                let d2 = 0;
                let s2 = 0;
                for (let i2 = 0; i2 < width * height; ++i2) {
                    const b = data[s2]
                    dst[d2] = b
                    dst[d2 + 1] = b
                    dst[d2 + 2] = b
                    dst[d2 + 3] = 255
                    d2 += 1
                    s2 += 4
                }
                break
            case "PF_V8U8":
            case "PF_V8U8_2":
                let d3 = 0;
                let s3 = 0;
                const offset = format === "PF_V8U8" ? 128 : 0
                for (let i3 = 0; i3 < width * height; ++i3) {
                    const u = data[s3] + offset
                    const v = data[s3 + 1] + offset
                    data[d3] = u
                    data[d3 + 1] = v
                    const uf = (u - offset) / 255.0 * 2 - 1
                    const vf = (v - offset) / 255.0 * 2 - 1
                    const t = 1.0 - uf * uf - vf * vf
                    if (t >= 0)
                        data[d3 + 2] = 255 - 255 * Math.floor(Math.sqrt(t))
                    else
                        data[d3 + 2] = 255
                    data[d3 + 3] = 255
                    s3 += 2
                    d3 += 4
                }
                break
            // TODO these are android, maybe ill do it later case PF_ASTC_4x4, PF_ASTC_6x6, PF_ASTC_8x8, PF_ASTC_10x10, PF_ASTC_12x12
            // All DXT formats
            case "PF_DXT1":
            case "PF_DXT3":
            case "PF_DXT5":
            case "PF_DXT5N":
                let form;
                if (format === "PF_DXT5" || format === "PF_DXT5N")
                    form = dxt.flags.DXT5
                else if (format === "PF_DXT3")
                    form = dxt.flags.DXT3
                else form = dxt.flags.DXT1
                const dxtRes = dxt.decompress(data, width, height, form)
                const decompressed = Buffer.from(dxtRes)
                decompressed.copy(dst, 0, 0, width * height * 4)
                break
            // WARNING: THIS IS NOT TESTED lol, most likely broke xd
            case "PF_BC5":
                const rgb = readBC5(data, width, height)
                return rgbBufferToImage(rgb, width, height)
        }

        return rgbaBufferToImage(dst, width, height)
    }
}

type PixelFormat = "PF_G8" | "PF_RGB8" | "PF_RGBA8"
    | "PF_R8G8B8A8" | "PF_BGRA8" | "PF_B8G8R8A8" | "PF_DXT1" | "PF_DXT3"
    | "PF_DXT5" | "PF_DXT5N" | "PF_V8U8" | "PF_V8U8_2" | "PF_BC5" | "PF_RGBA4"
export class PixelFormatInfo {
    public blockSizeX: number
    public blockSizeY: number
    public bytesPerBlock: number
    public x360AlignX: number
    public x360AlignY: number
    public float: boolean
    public pixelFormat: PixelFormat

    constructor(
        blockSizeX: number,
        blockSizeY: number,
        bytesPerBlock: number,
        x360AlignX: number,
        x360AlignY: number,
        float: boolean,
        pixelFormat: PixelFormat
    ) {
        this.blockSizeX = blockSizeX
        this.blockSizeY = blockSizeY
        this.bytesPerBlock = bytesPerBlock
        this.x360AlignX = x360AlignX
        this.x360AlignY = x360AlignY
        this.float = float
        this.pixelFormat = pixelFormat
    }

    static PF_G8          = new PixelFormatInfo(1, 1, 1, 64, 64, false, "PF_G8")
    static PF_RGB8        = new PixelFormatInfo(1, 1, 3, 0, 0, false, "PF_RGB8")
    static PF_RGBA8       = new PixelFormatInfo(1, 1, 4, 32, 32, false, "PF_RGBA8")
    static PF_R8G8B8A8    = new PixelFormatInfo(1, 1, 4, 32, 32, false, "PF_R8G8B8A8")
    static PF_BGRA8       = new PixelFormatInfo(1, 1, 4, 32, 32, false, "PF_BGRA8")
    static PF_B8G8R8A8    = new PixelFormatInfo(1, 1, 4, 32, 32, false, "PF_B8G8R8A8")
    static PF_DXT1        = new PixelFormatInfo(4, 4, 8, 128, 128, false, "PF_DXT1")
    static PF_DXT3        = new PixelFormatInfo(4, 4, 16, 128, 128, false, "PF_DXT3")
    static PF_DXT5        = new PixelFormatInfo(4, 4, 16, 128, 128, false, "PF_DXT5")
    static PF_DXT5N       = new PixelFormatInfo(4, 4, 16, 128, 128, false, "PF_DXT5N")
    static PF_V8U8        = new PixelFormatInfo(1, 1, 2, 64, 32, false, "PF_V8U8")
    static PF_V8U8_2      = new PixelFormatInfo(1, 1, 2, 64, 32, false, "PF_V8U8_2")
    static PF_BC5         = new PixelFormatInfo(4, 4, 16, 0, 0, false, "PF_BC5")
    static PF_RGBA4       = new PixelFormatInfo(1, 1, 2, 0, 0, false, "PF_RGBA4")
    // static PF_ASTC_4x4    = new PixelFormatInfo(4, 4, 16, 0, 0, false)
    // static PF_ASTC_6x6    = new PixelFormatInfo(6, 6, 16, 0, 0, false)
    // static PF_ASTC_8x8    = new PixelFormatInfo(8, 8, 16, 0, 0, false)
    // static PF_ASTC_10x10  = new PixelFormatInfo(10, 10, 16, 0, 0, false)
    // static PF_ASTC_12x12  = new PixelFormatInfo(12, 12, 16, 0, 0, false)
}

// kinda yeeted from stackoverflow
function rgbaBufferToImage(rgba: Buffer, width: number, height: number) {
    const img = createCanvas(width, height)
    const ctx = img.getContext("2d")
    const imageData = ctx.createImageData(width, height)
    const len = imageData.data.length
    let t = 0
    for (let i = 0; i < len; i += 4) {
        imageData.data[i]     = rgba[t]
        imageData.data[i + 1] = rgba[t + 1]
        imageData.data[i + 2] = rgba[t + 2]
        imageData.data[i + 3] = rgba[t + 3]
        t += 4
    }
    ctx.putImageData(imageData, 0, 0)
    return img.toBuffer()
}

function rgbBufferToImage(rgb: Buffer, width: number, height: number) {
    const img = createCanvas(width, height)
    const ctx = img.getContext("2d")
    const imageData = ctx.createImageData(width, height)
    const len = imageData.data.length
    let t = 0
    for (let i = 0; i < len; i += 4) {
        imageData.data[i]     = rgb[t]
        imageData.data[i + 1] = rgb[t + 1]
        imageData.data[i + 2] = rgb[t + 2]
        imageData[i + 3] = 255
        t += 3
    }
    ctx.putImageData(imageData, 0, 0)
    return img.toBuffer()
}