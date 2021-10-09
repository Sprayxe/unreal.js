import { UStaticMesh_Properties } from "./UStaticMesh_Properties";
import { FStripDataFlags } from "../../objects/engine/FStripDataFlags";
import { Lazy } from "../../../util/Lazy";
import { UObject } from "./UObject";
import { FGuid } from "../../objects/core/misc/Guid";
import { FVector } from "../../objects/core/math/FVector";
import { FBoxSphereBounds } from "../../objects/core/math/FBoxSphereBounds";
import { UnrealArray } from "../../../util/UnrealArray";
import { FStaticMaterial } from "../objects/meshes/FStaticMaterial";
import { UMaterialInterface } from "./mats/UMaterialInterface";
import { FAssetArchive } from "../reader/FAssetArchive";
import {
    VER_UE4_RENAME_CROUCHMOVESCHARACTERDOWN,
    VER_UE4_RENAME_WIDGET_VISIBILITY,
    VER_UE4_STATIC_MESH_STORE_NAV_COLLISION
} from "../../versions/Versions";
import { ParserException } from "../../../exceptions/Exceptions";
import { Game } from "../../../index";
import { EFRenderingObjectVersion, FRenderingObjectVersion } from "../../versions/FRenderingObjectVersion";
import { FAssetArchiveWriter } from "../writer/FAssetArchiveWriter";
import { FStaticMeshLODResources } from "../objects/meshes/FStaticMeshLODResources";
import { FDistanceFieldVolumeData } from "../../objects/engine/FDistanceFieldVolumeData";
import { EFEditorObjectVersion, FEditorObjectVersion } from "../../versions/FEditorObjectVersion";

export class UStaticMesh extends UStaticMesh_Properties {
    private static readonly MAX_STATIC_UV_SETS_UE4 = 8
    private static readonly MAX_STATIC_LODS_UE4 = 8

    public stripFlags: FStripDataFlags = null
    public bodySetup: Lazy<UObject> = null
    public navCollision: Lazy<UObject> = null // UNavCollision
    public lightingGuid: FGuid = null
    public sockets: Array<Lazy<UObject>> = null
    public lods = new Array<FStaticMeshLODResources>()
    public bounds = new FBoxSphereBounds(new FVector(), new FVector(), 0)
    public lodsShareStaticLighting = false
    public screenSize = new UnrealArray<number>(8, () => 0)
    public staticMaterials = Array<FStaticMaterial>()
    public materials = new Array<Lazy<UMaterialInterface>>()

    public deserialize(Ar: FAssetArchive, validPos: number) {
        super.deserialize(Ar, validPos)

        this.stripFlags = new FStripDataFlags(Ar)
        const cooked = Ar.readBoolean()
        this.bodySetup = Ar.readObject()
        this.navCollision = Ar.ver >= VER_UE4_STATIC_MESH_STORE_NAV_COLLISION ? Ar.readObject() : null

        if (!this.stripFlags.isEditorDataStripped) {

        }
        this.lightingGuid = new FGuid(Ar)

        const socketLength = Ar.readInt32()
        this.sockets = new Array(socketLength)
        for (let i = 0; i < socketLength; ++i) {
            this.sockets[i] = Ar.readObject()
        }

        if (!this.stripFlags.isEditorDataStripped)
            // TODO https://github.com/gildor2/UEViewer/blob/master/Unreal/UnMesh4.cpp#L2382
            throw new ParserException("Static Mesh with Editor Data not implemented yet")

        // this if block doesn't always make sense to me:
        // https://github.com/FabianFG/JFortniteParse/blob/85c07b3d8b4e89e8d5a97a55ba621ee2ec9a459b/src/main/kotlin/me/fungames/jfortniteparse/ue4/assets/exports/UStaticMesh.kt#L64
        // within the if block which is used if cooked == true there are multiple extra checks of the cooked variable
        // even tho it is never reassigned and it is marked as non changeable ('val')
        // i guess this is an issue so therefore im skipping some checks

        // serialize FStaticMeshRenderData
        if (cooked) {
            if (Ar.versions.get("StaticMesh.KeepMobileMinLODSettingOnDesktop")) {
                // The serialization of this variable is cvar-dependent in UE4, so there's no clear way to understand
                // if it should be serialize in our code or not.
                Ar.readInt32() // MinMobileLODIdx
            }

            /*if (!cooked) { ^ read above
                Ar.readTArray { Ar.readInt32() } // WedgeMap
                Ar.readTArray { Ar.readInt32() } // MaterialIndexToImportIndex
            }*/

            const lodsLength = Ar.readInt32()
            this.lods = new Array(lodsLength)
            for (let i = 0; i < lodsLength; ++i) {
                this.lods[i] = new FStaticMeshLODResources(Ar)
            }

            if (Ar.game >= Game.GAME_UE4(23))
                Ar.readUInt8() // NumInlinedLODs

            // {...} ^ read above
            if (Ar.ver >= VER_UE4_RENAME_CROUCHMOVESCHARACTERDOWN) {
                let stripped = false

                if (Ar.ver >= VER_UE4_RENAME_WIDGET_VISIBILITY) {
                    const stripFlags2 = new FStripDataFlags(Ar)
                    stripped = stripFlags2.isDataStrippedForServer
                    if (Ar.game >= Game.GAME_UE4(21)) {
                        // 4.21 uses additional strip flag for distance field
                        stripped = Boolean(Number(stripped) | Number(stripFlags2.isClassDataStripped(1)))
                    }
                }

                if (!stripped) {
                    // serialize FDistanceFieldVolumeData for each LOD
                    for (let i = 0; i < lodsLength; ++i) {
                        const hasDistanceDataField = Ar.readBoolean()
                        if (hasDistanceDataField)
                            new FDistanceFieldVolumeData(Ar) // VolumeData
                    }
                }
            }

            this.bounds = new FBoxSphereBounds(Ar)

            // Note: bLODsShareStaticLighting field exists in all engine versions except UE4.15.
            if (Ar.versions.get("StaticMesh.HasLODsShareStaticLighting"))
                this.lodsShareStaticLighting = Ar.readBoolean()


            if (Ar.game < Game.GAME_UE4(14))
                Ar.readBoolean() // bReducedBySimplygon

            if (FRenderingObjectVersion.get(Ar) < EFRenderingObjectVersion.TextureStreamingMeshUVChannelData) {
                // StreamingTextureFactors
                // StreamingTextureFactor for each UV set
                for (let i = 0; i < UStaticMesh.MAX_STATIC_UV_SETS_UE4; ++i)
                    Ar.readFloat32()
                Ar.readFloat32() // MaxStreamingTextureFactor
            }

            // {...} ^ read above
            // ScreenSize for each LOD
            const maxNumLods = Ar.game >= Game.GAME_UE4(9) ? UStaticMesh.MAX_STATIC_LODS_UE4 : 4
            for (let i = 0; i < maxNumLods; ++i) {
                if (Ar.game >= Game.GAME_UE4(20))
                    Ar.readBoolean() // bFloatCooked
                this.screenSize[i] = Ar.readFloat32()
            }
        } // end of FStaticMeshRenderData

        if (cooked && Ar.game >= Game.GAME_UE4(20)) {
            const hasOccluderData = Ar.readBoolean()
            if (hasOccluderData) {
                const _length1 = Ar.readInt32()
                for (let i = 0; i < _length1; ++i)
                    new FVector(Ar) // Vertices
                const _length2 = Ar.readInt32()
                for (let i = 0; i < _length2; ++i)
                    Ar.readUInt16() // Indices
            }
        }

        if (Ar.game >= Game.GAME_UE4(14)) {
            // Serialize following data to obtain material references for UE4.14+.
            // Don't bother serializing anything beyond this point in earlier versions.
            // Note: really, UE4 uses VER_UE4_SPEEDTREE_STATICMESH
            const hasSpeedTreeWind = Ar.readBoolean()
            if (hasSpeedTreeWind) {
                // TODO - FSpeedTreeWind serialization
                // Ignore remaining data
            } else {
                if (FEditorObjectVersion.get(Ar) >= EFEditorObjectVersion.RefactorMeshEditorMaterials) {
                    // UE4.14+ - "Materials" are deprecated, added StaticMaterials
                    const staticMaterialsLength = Ar.readInt32()
                    this.staticMaterials = new Array(staticMaterialsLength)
                    for (let i = 0; i < staticMaterialsLength; ++i)
                        this.staticMaterials[i] = new FStaticMaterial(Ar)
                }
            }
        }

        this.materials = this.staticMaterials.map(it => it.materialInterface).filter(it => it != null)

        // Drop remaining SpeedTree data
        if (validPos > 0)
            Ar.pos = validPos
    }

    public serialize(Ar: FAssetArchiveWriter) {
        throw new ParserException("Serializing UStaticMesh not supported")
    }
}