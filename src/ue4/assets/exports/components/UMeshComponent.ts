import { UPrimitiveComponent } from "./UPrimitiveComponent";
import { UMaterialInterface } from "../mats/UMaterialInterface";
import { Lazy } from "../../../../util/Lazy";

export class UMeshComponent extends UPrimitiveComponent {
    public OverrideMaterials: Lazy<UMaterialInterface>[] = null
    public bEnableMaterialParameterCaching: boolean = null
}