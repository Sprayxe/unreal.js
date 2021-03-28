import { FileProvider } from "./fileprovider/FileProvider";
import { FGuid } from "./ue4/objects/core/misc/Guid";
import axios from "axios";

(async () => {
    const provider = new FileProvider("C:/Program Files/Epic Games/Fortnite/FortniteGame/Content/Paks")
    provider.populateIoStoreFiles = true
    await provider.initialize()

    const { data } = (await axios.get("https://fortnite-api.com/v2/aes")).data
    await provider.submitKey(FGuid.mainGuid, data.mainKey)

    const unloaded = provider.unloadedPaks()
    const required = provider.requiredKeys()
    unloaded.forEach((v) => {
        const path = v.path.split("/").pop().replace(".pak", "")
        const d = data.dynamicKeys.find(_ => _.pakFilename === path)
        if (d) {
            const guid = required.find(r => r.equals(v.pakInfo.encryptionKeyGuid))
            if (guid)
                provider.submitKey(guid, d.key)
        }
    })

    const pkg = provider.loadObject("FortniteGame/Content/Athena/Items/Cosmetics/Characters/CID_144_Athena_Commando_M_SoccerDudeA.uasset")
    console.log(pkg)
})()