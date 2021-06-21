import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";
//import axios from "axios";
//import { UsmapTypeMappingsProvider } from "./ue4/assets/mappings/UsmapTypeMappingsProvider";
//import { readFileSync, writeFileSync } from "fs";
import { Ue4Version } from "./ue4/versions/Game";
//import { UnrealMap } from "./util/UnrealMap";

(async () => {
    //const usmap = readFileSync("D:/Downloads/FortniteRelease-17.00-CL-16555138-Windows_oo.usmap")
    //const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks",
      //  Ue4Version.GAME_UE4_LATEST, new UsmapTypeMappingsProvider(usmap))
    //provider.mappingsProvider.reload()
    const provider = new FileProvider("C:/Riot Games/VALORANT/live/ShooterGame/Content/Paks", Ue4Version.GAME_VALORANT)
    //provider.populateIoStoreFiles = true
    await provider.initialize()

    //await submitFortniteAesKeys(provider)
    await provider.submitKey(FGuid.mainGuid, "0x4BE71AF2459CF83899EC9DC2CB60E22AC4B3047E0211034BBABE9D174C069DD6")

    //const path = "FortniteGame/Content/Items/GiftBoxes/Messages/GrantChallenge/GrantChallenge"
    const path = "ShooterGame/Content/WwiseAudio/Media/329781885"

    const pkg = provider.loadGameFile(path)
    console.log(pkg.toJson())
})()

async function submitFortniteAesKeys(provider: FileProvider) {
    //const { data } = await axios.get("https://benbot.app/api/v1/aes")
    await provider.submitKey(FGuid.mainGuid, "0x840a3c61b7ba7fdc58eab092ac9f29d23229da63c417f2f0add69f30f1b6980d")
    /*const keys = new UnrealMap<FGuid, string>()
    for (const key in data.dynamicKeys) {
        const value = data.dynamicKeys[key]
        const fileName = key.split("/").pop().toLowerCase()
        const pak = provider.unloadedPaks().find(p => p.path.split("/").pop().toLowerCase() === fileName)
        if (!pak)
            continue
        keys.set(pak.pakInfo.encryptionKeyGuid, value)
    }
    await provider.submitKeysStr(keys)*/
}
