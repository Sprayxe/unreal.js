import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";
import axios from "axios";
import { CityHash } from "./util/CityHash";

(async () => {
    const s = "FortniteGame/Content/Athena/Items/Cosmetics/Characters/CID_144_Athena_Commando_M_SoccerDudeA.uasset"
    const b = Buffer.from(s, "utf16le")
    console.log(CityHash.cityHash64(b, 0, b.length))
    /*const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks")
    provider.populateIoStoreFiles = true
    await provider.initialize()

    const { data } = (await axios.get("https://fortnite-api.com/v2/aes")).data
    await provider.submitKey(FGuid.mainGuid, data.mainKey)

    const pkg = provider.loadObject("FortniteGame/Content/Athena/Items/Cosmetics/Characters/CID_144_Athena_Commando_M_SoccerDudeA.uasset")
    console.log(pkg)*/
})()
