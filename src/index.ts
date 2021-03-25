import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";

(async () => {
    console.log("Create provider")
    const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks")
    await provider.initialize()
    await provider.submitKey(FGuid.mainGuid, "0xD79DD62584A7401841F80C070F8B8B405A100F51511E918ABF4EF2BB981BCA0A")
    const file = provider.mountedIoStoreReaders()
    console.log(file)
    // events
    /*provider.on("mounted:iostore", (reader) => {
        console.log(`EVENT: Mounted iostore container '${reader.containerId}'`)
    })
    provider.on("mounted:reader", (reader) => {
        console.log(`EVENT: Mounted reader '${reader.fileName}'`)
    })*/
})()