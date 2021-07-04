"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileProvider_1 = require("./fileprovider/FileProvider");
const Guid_1 = require("./ue4/objects/core/misc/Guid");
//import axios from "axios";
const UsmapTypeMappingsProvider_1 = require("./ue4/assets/mappings/UsmapTypeMappingsProvider");
const fs_1 = require("fs");
const Game_1 = require("./ue4/versions/Game");
const UTexture2D_1 = require("./ue4/assets/exports/tex/UTexture2D");
const Image_1 = require("./ue4/converters/textures/Image");
//import { UnrealMap } from "./util/UnrealMap";
(async () => {
    const usmap = fs_1.readFileSync("D:/Downloads/++Fortnite+Release-17.10-CL-16745144-Windows_oo.usmap");
    const provider = new FileProvider_1.FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks", Game_1.Ue4Version.GAME_UE4_LATEST, new UsmapTypeMappingsProvider_1.UsmapTypeMappingsProvider(usmap), {
        GDebugProperties: true
    });
    provider.mappingsProvider.reload();
    //const provider = new FileProvider("C:/Riot Games/VALORANT/live/ShooterGame/Content/Paks", Ue4Version.GAME_VALORANT)
    provider.populateIoStoreFiles = true;
    await provider.initialize();
    const start = Date.now();
    await submitFortniteAesKeys(provider);
    //await provider.submitKey(FGuid.mainGuid, "0x4BE71AF2459CF83899EC9DC2CB60E22AC4B3047E0211034BBABE9D174C069DD6")
    console.log("Paks mounted in: " + (Date.now() - start) + "ms");
    const path = "FortniteGame/Content/Abilities/Player/Constructor/Actives/Decoy/Textures/Constr_Decoy_N";
    //const path = "/Game/Characters/_Core/BasePlayerCharacter"
    const pkg = provider.loadGameFile(path);
    const tex = pkg.getExportOfTypeOrNull(UTexture2D_1.UTexture2D);
    const img = Image_1.Image.convert(tex);
    fs_1.writeFileSync("test.png", img);
})();
async function submitFortniteAesKeys(provider) {
    //const { data } = await axios.get("https://benbot.app/api/v1/aes")
    await provider.submitKey(Guid_1.FGuid.mainGuid, "0x008F96D1CFC625479995F4ED584ACBE709C1F88E7417DAEBFB192C767F7AC84D");
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
