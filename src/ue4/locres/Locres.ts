import { FnLanguage } from "./FnLanguage";
import { FByteArchive } from "../reader/FByteArchive";

export class Locres {
    locres: Buffer
    fileName: string
    language: string
    texts: any

    constructor(file: Buffer, fileName: string = "UNKNOWN-LOCRES-FILE") {
        this.locres = file
        this.fileName = fileName
        this.language = FnLanguage.UNKNOWN

        const locresAr = new FByteArchive(this.locres)
        this.texts
    }
}