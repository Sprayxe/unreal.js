import { FArchive } from "./ue4/reader/FArchive";
import * as fs from "fs"
import { EIoStoreTocReadOptions, FIoStoreTocResource } from "./ue4/io/IoStore";
import { Oodle } from "./oodle/Oodle";

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
    const u = new UnrealJS()
    const d = u.readGlobalUtoc()
    console.log(d)
})()