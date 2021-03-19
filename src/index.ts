import { FArchive } from "./ue4/reader/FArchive";
import * as fs from "fs"
import { EIoStoreTocReadOptions, FIoStoreTocResource } from "./ue4/io/IoStore";
import Collection from "@discordjs/collection";
import { UnrealMap } from "./util/UnrealMap";

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
    const h1 = new Collection()
    const h2 = new UnrealMap()
    const buf1 = 1000n
    const buf2 = 1000n
    h1.set(buf1, "1234")
    h2.set(buf1, "1234")
    console.log(`Collection-1: ${h1.has(buf1)}`)
    console.log(`Collection-2: ${h1.has(buf2)}`)
    console.log(`UnrealMap-1: ${h2.has(buf1)}`)
    console.log(`UnrealMap-2: ${h2.has(buf2)}`)
    console.log(`UnrealMap-3: ${h2.has("h")}`)
    /*const u = new UnrealJS()
   const d = u.readGlobalUtoc()
   console.log(d)*/
})()