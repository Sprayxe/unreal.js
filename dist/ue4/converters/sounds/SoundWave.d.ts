/// <reference types="node" />
/// <reference types="ref-napi" />
import { USoundWave } from "../../assets/exports/USoundWave";
export declare class SoundWave {
    data: Buffer;
    format: string;
    constructor(data: Buffer, format: string);
    equals(other?: any): boolean;
    static convert(soundWave: USoundWave): SoundWave;
}
