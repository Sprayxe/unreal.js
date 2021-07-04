import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";
//import axios from "axios";
import { UsmapTypeMappingsProvider } from "./ue4/assets/mappings/UsmapTypeMappingsProvider";
import { readFileSync, writeFileSync } from "fs";
import { Ue4Version } from "./ue4/versions/Game";
import { FnLanguage } from "./ue4/locres/FnLanguage";
import { UTexture2D } from "./ue4/assets/exports/tex/UTexture2D";
import { Image } from "./ue4/converters/textures/Image";
//import { UnrealMap } from "./util/UnrealMap";

(async () => {
    const usmap = readFileSync("D:/Downloads/++Fortnite+Release-17.10-CL-16745144-Windows_oo.usmap")
    const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks",
        Ue4Version.GAME_UE4_LATEST, new UsmapTypeMappingsProvider(usmap), {
            GDebugProperties: true
        })
    provider.mappingsProvider.reload()
    //const provider = new FileProvider("C:/Riot Games/VALORANT/live/ShooterGame/Content/Paks", Ue4Version.GAME_VALORANT)
    provider.populateIoStoreFiles = true
    await provider.initialize()

    const start = Date.now()
    await submitFortniteAesKeys(provider)
    //await provider.submitKey(FGuid.mainGuid, "0x4BE71AF2459CF83899EC9DC2CB60E22AC4B3047E0211034BBABE9D174C069DD6")
    console.log("Paks mounted in: " + (Date.now() - start) + "ms")

    const path = "FortniteGame/Content/Abilities/Player/Constructor/Actives/Decoy/Textures/Constr_Decoy_N"
    //const path = "/Game/Characters/_Core/BasePlayerCharacter"

    const pkg = provider.loadGameFile(path)
    const tex = pkg.getExportOfTypeOrNull(UTexture2D) as UTexture2D
    const img = Image.convert(tex)
    writeFileSync("test.png", img)
})()

async function submitFortniteAesKeys(provider: FileProvider) {
    //const { data } = await axios.get("https://benbot.app/api/v1/aes")
    await provider.submitKey(FGuid.mainGuid, "0x008F96D1CFC625479995F4ED584ACBE709C1F88E7417DAEBFB192C767F7AC84D")
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