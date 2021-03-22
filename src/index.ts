// TODO: EXPORTS STUFF LIKE @jsprismarine/brigiader

import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";

(async () => {
    const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks")
    await provider.findAndLoadFiles()
    await provider.submitKey(FGuid.mainGuid, "0xD79DD62584A7401841F80C070F8B8B405A100F51511E918ABF4EF2BB981BCA0A")
    const pkg = provider.loadGameFile("FortniteGame/Content/Athena/Items/Cosmetics/Characters/CID_144_Athena_Commando_M_SoccerDudeA.uasset")
    console.log(pkg)
})()