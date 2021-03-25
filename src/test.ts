import { FArchive } from "./ue4/reader/FArchive";
import * as fs from "fs"
import { EIoStoreTocReadOptions, FIoStoreReader, FIoStoreTocResource } from "./ue4/io/IoStore";
import { createIoChunkId, EIoChunkType, FIoStoreEnvironment } from "./ue4/io/IoDispatcher";
import { FGuid } from "./ue4/objects/core/misc/Guid";
import { UnrealMap } from "./util/UnrealMap";
import { FByteArchive } from "./ue4/reader/FByteArchive";
import { loadNameBatch } from "./ue4/objects/uobject/NameBatchSerialization";

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

    createGlobalReader() {
        const utoc = fs.readFileSync(`${this.path}/global.utoc`)
        const Ar = new FArchive(utoc)
        const toc = new FIoStoreTocResource()
        toc.read(Ar, EIoStoreTocReadOptions.ReadAll)
        const reader = new FIoStoreReader()
        reader.initialize(new FIoStoreEnvironment(`${this.path}/global`), new UnrealMap<FGuid, Buffer>())
        return reader
    }
}

(async () => {
    const u = new UnrealJS()
    const d = u.createGlobalReader()

    let namesId = createIoChunkId(0n, 0, EIoChunkType.LoaderGlobalNames)
    let hashesId = createIoChunkId(0n, 0, EIoChunkType.LoaderGlobalNameHashes)

    const nameBuffer = new FByteArchive(d.read(namesId))
    const hashBuffer = new FByteArchive(d.read(hashesId))

    const names = loadNameBatch(nameBuffer, hashBuffer)
    console.log(names)
})()