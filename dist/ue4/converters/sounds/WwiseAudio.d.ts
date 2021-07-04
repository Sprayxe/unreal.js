/// <reference types="node" />
/// <reference types="ref-napi" />
import { UAkMediaAssetData } from "../../assets/exports/UAkMediaAssetData";
export declare class WwiseAudio {
    name: string;
    data: Buffer;
    format: string;
    constructor(data: Buffer, format: string, name: string);
    equals(other?: any): boolean;
    export(outputPath?: string): void;
    static convert(mediaData: UAkMediaAssetData): WwiseAudio;
}
