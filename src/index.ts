// TODO: EXPORTS STUFF LIKE @jsprismarine/brigiader

import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";
import { PakFileReader } from "./ue4/pak/PakFileReader";

(async () => {
    const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks")
    await provider.submitKey(FGuid.mainGuid, "0xD79DD62584A7401841F80C070F8B8B405A100F51511E918ABF4EF2BB981BCA0A")
    await provider.findAndLoadFiles()
    // events
    provider.on("mounted:iostore", (reader) => {
        console.log(`EVENT: Mounted iostore container '${reader.containerId}'`)
    })
    provider.on("mounted:reader", (reader) => {
        console.log(`EVENT: Mounted reader '${reader.fileName}'`)
    })
})()