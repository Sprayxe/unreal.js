import { UProperty } from "../../../../util/decorators/UProperty";
import { FName } from "../../../objects/uobject/FName";
import { UMaterialInterface } from "../../exports/mats/UMaterialInterface";
import { Lazy } from "../../../../util/Lazy";
import { FAssetArchive } from "../../reader/FAssetArchive";
import { FMeshUVChannelInfo } from "./FMeshUVChannelInfo";
import { EFRenderingObjectVersion, FRenderingObjectVersion } from "../../../versions/FRenderingObjectVersion";

export class FStaticMaterial {
    @UProperty({name: "MaterialInterface"})
    public materialInterface: Lazy<UMaterialInterface> = null
    @UProperty({name: "MaterialSlotName"})
    public materialSlotName: FName = FName.NAME_None
    @UProperty({name: "ImportedMaterialSlotName"})
    public importedMaterialSlotName: FName = FName.NAME_None
    @UProperty({name: "UVChannelData"})
    public uvChannelData: FMeshUVChannelInfo = null

    constructor(Ar?: FAssetArchive) {
        this.materialInterface = Ar.readObject()
        this.materialSlotName = Ar.readFName()
        if (FRenderingObjectVersion.get(Ar) >= EFRenderingObjectVersion.TextureStreamingMeshUVChannelData)
            this.uvChannelData = new FMeshUVChannelInfo(Ar)
    }
}