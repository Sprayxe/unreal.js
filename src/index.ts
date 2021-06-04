import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";
import axios from "axios";
//import { UnrealMap } from "./util/UnrealMap";
import { Game } from "./ue4/versions/Game";
import { writeFileSync, unlinkSync } from "fs";
import { UAkMediaAssetData } from "./ue4/assets/exports/UAkMediaAssetData";
import { WwiseAudio } from "./ue4/converters/WwiseAudio";

(async () => {
    //const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks")
    const provider = new FileProvider("C:\\Riot Games\\VALORANT\\live\\ShooterGame\\Content\\Paks", Game.GAME_VALORANT)
    //provider.populateIoStoreFiles = true
    await provider.initialize()

    //await submitFortniteAesKeys(provider)
    await provider.submitKey(FGuid.mainGuid, "0x4BE71AF2459CF83899EC9DC2CB60E22AC4B3047E0211034BBABE9D174C069DD6")

    //const path = "FortniteGame/Content/Athena/Items/Cosmetics/Characters/CID_144_Athena_Commando_M_SoccerDudeA"
    const path = "ShooterGame/Content/WwiseAudio/Media/329781885"

    const pkg = provider.loadGameFile(path)
    const sound = pkg.getExportOfTypeOrNull(UAkMediaAssetData) as UAkMediaAssetData
    if (sound) {
        const soundWave = WwiseAudio.convert(sound)
        await soundWave.export()
        return
    }
    console.log("No audio file found.")
})()

async function submitFortniteAesKeys(provider: FileProvider) {
    const { data } = await axios.get("https://benbot.app/api/v1/aes")
    await provider.submitKey(FGuid.mainGuid, data.mainKey)
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
