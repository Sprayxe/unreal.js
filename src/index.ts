import { FArchive } from "./ue4/reader/FArchive";
import * as fs from "fs"
import { EIoStoreTocReadOptions, FIoStoreTocResource } from "./ue4/io/IoStore";
import { COMPRESSION_LEVEL_OPTIMAL5, COMPRESSOR_HYDRA, COMPRESSOR_LEVIATHAN, Oodle } from "./oodle/Oodle";

export class UnrealJS {
    path: string

    constructor(path = "C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Content\\Paks") {
        this.path = path
    }

    readGlobalUtoc() {
        const utoc = fs.readFileSync(`${this.path}/global.utoc`)
        const Ar = new FArchive(utoc)
        const toc = new FIoStoreTocResource()
        toc.read(Ar, EIoStoreTocReadOptions.ReadAll)
        return toc
    }
}

(async () => {
    const src = Buffer.from("compressed")
    console.log(src)
    const dst = Oodle.compress(src, COMPRESSOR_HYDRA, COMPRESSION_LEVEL_OPTIMAL5)
    console.log(dst)
    const _dst = Buffer.alloc(dst.length)
    Oodle.decompress(dst, _dst)
    console.log(_dst)
    /*const u = new UnrealJS()
    const d = u.readGlobalUtoc()
    console.log(d)*/
})()