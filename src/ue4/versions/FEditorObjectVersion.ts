import { FGuid } from "../objects/core/misc/Guid";
import { FArchive } from "../reader/FArchive";
import { Game } from "./Game";

export enum EFEditorObjectVersion {
    // Before any version changes were made
    BeforeCustomVersionWasAdded,
    // Localizable text gathered and stored in packages is now flagged with a localizable text gathering process version
    GatheredTextProcessVersionFlagging,
    // Fixed several issues with the gathered text cache stored in package headers
    GatheredTextPackageCacheFixesV1,
    // Added support for "root" meta-data (meta-data not associated with a particular object in a package)
    RootMetaDataSupport,
    // Fixed issues with how Blueprint bytecode was cached
    GatheredTextPackageCacheFixesV2,
    // Updated FFormatArgumentData to allow variant data to be marshaled from a BP into C++
    TextFormatArgumentDataIsVariant,
    // Changes to SplineComponent
    SplineComponentCurvesInStruct,
    // Updated ComboBox to support toggling the menu open, better controller support
    ComboBoxControllerSupportUpdate,
    // Refactor mesh editor materials
    RefactorMeshEditorMaterials,
    // Added UFontFace assets
    AddedFontFaceAssets,
    // Add UPROPERTY for TMap of Mesh section, so the serialize will be done normally (and export to text will work correctly)
    UPropertryForMeshSection,
    // Update the schema of all widget blueprints to use the WidgetGraphSchema
    WidgetGraphSchema,
    // Added a specialized content slot to the background blur widget
    AddedBackgroundBlurContentSlot,
    // Updated UserDefinedEnums to have stable keyed display names
    StableUserDefinedEnumDisplayNames,
    // Added "Inline" option to UFontFace assets
    AddedInlineFontFaceAssets,
    // Fix a serialization issue with static mesh FMeshSectionInfoMap FProperty
    UPropertryForMeshSectionSerialize,
    // Adding a version bump for the new fast widget construction in case of problems.
    FastWidgetTemplates,
    // Update material thumbnails to be more intelligent on default primitive shape for certain material types
    MaterialThumbnailRenderingChanges,
    // Introducing a new clipping system for Slate/UMG
    NewSlateClippingSystem,
    // MovieScene Meta Data added as native Serialization
    MovieSceneMetaDataSerialization,
    // Text gathered from properties now adds two variants: a version without the package localization ID (for use at runtime), and a version with it (which is editor-only)
    GatheredTextEditorOnlyPackageLocId,
    // Added AlwaysSign to FNumberFormattingOptions
    AddedAlwaysSignNumberFormattingOption,
    // Added additional objects that must be serialized as part of this new material feature
    AddedMaterialSharedInputs,
    // Added morph target section indices
    AddedMorphTargetSectionIndices,
    // Serialize the instanced static mesh render data, to avoid building it at runtime
    SerializeInstancedStaticMeshRenderData,
    // Change to MeshDescription serialization (moved to release)
    MeshDescriptionNewSerialization_MovedToRelease,
    // New format for mesh description attributes
    MeshDescriptionNewAttributeFormat,
    // Switch root component of SceneCapture actors from MeshComponent to SceneComponent
    ChangeSceneCaptureRootComponent,
    // StaticMesh serializes MeshDescription instead of RawMesh
    StaticMeshDeprecatedRawMesh,
    // MeshDescriptionBulkData contains a Guid used as a DDC key
    MeshDescriptionBulkDataGuid,
    // Change to MeshDescription serialization (removed FMeshPolygon::HoleContours)
    MeshDescriptionRemovedHoles,
    // Change to the WidgetCompoent WindowVisibilty default value
    ChangedWidgetComponentWindowVisibilityDefault,
    // Avoid keying culture invariant display strings during serialization to avoid non-deterministic cooking issues
    CultureInvariantTextSerializationKeyStability,
    // Change to UScrollBar and UScrollBox thickness property (removed implicit padding of 2, so thickness value must be incremented by 4).
    ScrollBarThicknessChange,
    // Deprecated LandscapeHoleMaterial
    RemoveLandscapeHoleMaterial,
    // MeshDescription defined by triangles instead of arbitrary polygons
    MeshDescriptionTriangles,
    //Add weighted area and angle when computing the normals
    ComputeWeightedNormals,
    // SkeletalMesh now can be rebuild in editor, no more need to re-import
    SkeletalMeshBuildRefactor,
    // Move all SkeletalMesh source data into a private uasset in the same package has the skeletalmesh
    SkeletalMeshMoveEditorSourceDataToPrivateAsset,
    // Parse text only if the number is inside the limits of its type
    NumberParsingOptionsNumberLimitsAndClamping,
    //Make sure we can have more then 255 material in the skeletal mesh source data
    SkeletalMeshSourceDataSupport16bitOfMaterialNumber,

    // -----<new versions can be added above this line>-------------------------------------------------
    LatestVersion = SkeletalMeshSourceDataSupport16bitOfMaterialNumber
}

export class FEditorObjectVersion {
    public static readonly GUID = new FGuid(0xE4B068ED, 0xF49442E9, 0xA231DA0B, 0x2E46BB41)

    public static get(Ar: FArchive): number {
        const ver = Ar.customVersion(this.GUID)
        if (ver >= 0)
            return ver
        const game = Ar.game
        if (game < Game.GAME_UE4(12))
            return EFEditorObjectVersion.BeforeCustomVersionWasAdded
        if (game < Game.GAME_UE4(13))
            return EFEditorObjectVersion.GatheredTextPackageCacheFixesV1
        if (game < Game.GAME_UE4(14))
            return EFEditorObjectVersion.SplineComponentCurvesInStruct
        if (game < Game.GAME_UE4(15))
            return EFEditorObjectVersion.RefactorMeshEditorMaterials
        if (game < Game.GAME_UE4(16))
            return EFEditorObjectVersion.AddedInlineFontFaceAssets
        if (game < Game.GAME_UE4(17))
            return EFEditorObjectVersion.MaterialThumbnailRenderingChanges
        if (game < Game.GAME_UE4(19))
            return EFEditorObjectVersion.GatheredTextEditorOnlyPackageLocId
        if (game < Game.GAME_UE4(20))
            return EFEditorObjectVersion.AddedMorphTargetSectionIndices
        if (game < Game.GAME_UE4(21))
            return EFEditorObjectVersion.SerializeInstancedStaticMeshRenderData
        if (game < Game.GAME_UE4(22))
            return EFEditorObjectVersion.MeshDescriptionNewAttributeFormat
        if (game < Game.GAME_UE4(23))
            return EFEditorObjectVersion.MeshDescriptionRemovedHoles
        if (game < Game.GAME_UE4(24))
            return EFEditorObjectVersion.RemoveLandscapeHoleMaterial
        if (game < Game.GAME_UE4(25))
            return EFEditorObjectVersion.SkeletalMeshBuildRefactor
        if (game < Game.GAME_UE4(26))
            return EFEditorObjectVersion.SkeletalMeshMoveEditorSourceDataToPrivateAsset
        return EFEditorObjectVersion.LatestVersion
    }
}