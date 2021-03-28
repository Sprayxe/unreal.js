import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";
import axios from "axios";
import { hash64 } from "farmhash";

(async () => {
    const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks")
    provider.populateIoStoreFiles = true
    await provider.initialize()

    const { data } = (await axios.get("https://fortnite-api.com/v2/aes")).data
    await provider.submitKey(FGuid.mainGuid, data.mainKey)

    /*const unloaded = provider.unloadedPaks()
    const required = provider.requiredKeys()
    unloaded.forEach((v) => {
        const d = data.dynamicKeys.find(_ => _.pakGuid === v.pakInfo.encryptionKeyGuid.toString())
        if (d) {
            const guid = required.find(r => r.equals(v.pakInfo.encryptionKeyGuid))
            if (guid)
                provider.submitKey(guid, d.key)
        }
    })*/

    const pkg = provider.loadObject("FortniteGame/Content/Emote_Candy_Dance_CMM.uasset")
    console.log(pkg)
})()