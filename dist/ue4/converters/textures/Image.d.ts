/// <reference types="node" />
/// <reference types="ref-napi" />
import { FTexture2DMipMap, FTexturePlatformData, UTexture2D } from "../../assets/exports/tex/UTexture2D";
export declare class Image {
    static convert(tex: UTexture2D, texture?: FTexturePlatformData, mip?: FTexture2DMipMap, config?: ImageConfig): Buffer;
}
declare type PixelFormat = "PF_G8" | "PF_RGB8" | "PF_RGBA8" | "PF_R8G8B8A8" | "PF_BGRA8" | "PF_B8G8R8A8" | "PF_DXT1" | "PF_DXT3" | "PF_DXT5" | "PF_DXT5N" | "PF_V8U8" | "PF_V8U8_2" | "PF_BC5" | "PF_RGBA4";
export declare class PixelFormatInfo {
    blockSizeX: number;
    blockSizeY: number;
    bytesPerBlock: number;
    x360AlignX: number;
    x360AlignY: number;
    float: boolean;
    pixelFormat: PixelFormat;
    constructor(blockSizeX: number, blockSizeY: number, bytesPerBlock: number, x360AlignX: number, x360AlignY: number, float: boolean, pixelFormat: PixelFormat);
    static PF_G8: PixelFormatInfo;
    static PF_RGB8: PixelFormatInfo;
    static PF_RGBA8: PixelFormatInfo;
    static PF_R8G8B8A8: PixelFormatInfo;
    static PF_BGRA8: PixelFormatInfo;
    static PF_B8G8R8A8: PixelFormatInfo;
    static PF_DXT1: PixelFormatInfo;
    static PF_DXT3: PixelFormatInfo;
    static PF_DXT5: PixelFormatInfo;
    static PF_DXT5N: PixelFormatInfo;
    static PF_V8U8: PixelFormatInfo;
    static PF_V8U8_2: PixelFormatInfo;
    static PF_BC5: PixelFormatInfo;
    static PF_RGBA4: PixelFormatInfo;
}
export interface ImageConfig {
    /**
     * - Whether to use image smoothing for canvas image or not
     * @default false
     */
    imageSmoothingEnabled?: boolean;
    /**
     * - Quality of image smoothing
     * - Only takes effect when 'imageSmoothingEnabled' was set to true
     * @default medium
     */
    imageSmoothingQuality?: ImageSmoothingQuality;
    /**
     * - Overall quality of the image
     * @default good
     */
    quality?: "fast" | "good" | "best" | "nearest" | "bilinear";
}
export {};
