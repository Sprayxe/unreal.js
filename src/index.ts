import { FArchive } from "./ue4/reader/FArchive";
import * as fs from "fs/promises"

export class UnrealJS {
    path: string
    FArchive: FArchive = null
    FIoStoreTocHeader: any

    constructor (path = "C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Content\\Paks") {
        this.path = path
        this.FArchive = null
        this.FIoStoreTocHeader = {}
    }

    async readGlobalUtoc() {
        const UTOC = await fs.readFile(`${this.path}/global.utoc`)
        this.FArchive = new FArchive(UTOC)
        return this.FArchive.read(16)
    }
}

(async () => {
   const u = new UnrealJS()
   const d = await u.readGlobalUtoc()
   console.log(d.toString("binary"))
})()