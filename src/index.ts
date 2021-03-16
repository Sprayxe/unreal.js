import { FArchive } from "./ue4/reader/FArchive";
import * as fs from "fs"
import { DataTypeConverter } from "./util/DataTypeConverter";
import { FIoStoreTocHeader } from "./ue4/io/IoStore";

export class UnrealJS {
    path: string

    constructor(path = "C:\\Program Files\\Epic Games\\Fortnite\\FortniteGame\\Content\\Paks") {
        this.path = path
    }

    readGlobalUtoc() {
        const utoc = fs.readFileSync(`${this.path}/global.utoc`)
        const Ar = new FArchive(utoc)
        const header = new FIoStoreTocHeader(Ar)
        return header
    }
}

(async () => {
    DataTypeConverter.parseHexBinary("0xce0d9beff8da86195bc0f95e1612948871ed8daa0e9199d18272f5c80853156a")
    const u = new UnrealJS()
    const d = u.readGlobalUtoc()
    console.log(d)
})()