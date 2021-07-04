"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPackageFlags = void 0;
/**
 * EPackageFlags
 * @enum
 */
var EPackageFlags;
(function (EPackageFlags) {
    EPackageFlags[EPackageFlags["PKG_None"] = 0] = "PKG_None";
    EPackageFlags[EPackageFlags["PKG_NewlyCreated"] = 1] = "PKG_NewlyCreated";
    EPackageFlags[EPackageFlags["PKG_ClientOptional"] = 2] = "PKG_ClientOptional";
    EPackageFlags[EPackageFlags["PKG_ServerSideOnly"] = 4] = "PKG_ServerSideOnly";
    EPackageFlags[EPackageFlags["PKG_CompiledIn"] = 16] = "PKG_CompiledIn";
    EPackageFlags[EPackageFlags["PKG_ForDiffing"] = 32] = "PKG_ForDiffing";
    EPackageFlags[EPackageFlags["PKG_EditorOnly"] = 64] = "PKG_EditorOnly";
    EPackageFlags[EPackageFlags["PKG_Developer"] = 128] = "PKG_Developer";
    EPackageFlags[EPackageFlags["PKG_UncookedOnly"] = 256] = "PKG_UncookedOnly";
    //	PKG_Unused =					 0x00000200,
    //	PKG_Unused =					 0x00000400,
    //	PKG_Unused =					 0x00000800,
    //	PKG_Unused =					 0x00001000,
    EPackageFlags[EPackageFlags["PKG_UnversionedProperties"] = 8192] = "PKG_UnversionedProperties";
    EPackageFlags[EPackageFlags["PKG_ContainsMapData"] = 16384] = "PKG_ContainsMapData";
    //	PKG_Unused =					 0x00008000,
    EPackageFlags[EPackageFlags["PKG_Compiling"] = 65536] = "PKG_Compiling";
    EPackageFlags[EPackageFlags["PKG_ContainsMap"] = 131072] = "PKG_ContainsMap";
    EPackageFlags[EPackageFlags["PKG_RequiresLocalizationGather"] = 262144] = "PKG_RequiresLocalizationGather";
    //	PKG_Unused						 0x00080000,
    EPackageFlags[EPackageFlags["PKG_PlayInEditor"] = 1048576] = "PKG_PlayInEditor";
    EPackageFlags[EPackageFlags["PKG_ContainsScript"] = 2097152] = "PKG_ContainsScript";
    EPackageFlags[EPackageFlags["PKG_DisallowExport"] = 4194304] = "PKG_DisallowExport";
    //	PKG_Unused =					 0x00800000,
    //	PKG_Unused =					 0x01000000,
    //	PKG_Unused =					 0x02000000,
    //	PKG_Unused =					 0x04000000,
    //	PKG_Unused =					 0x08000000,
    EPackageFlags[EPackageFlags["PKG_DynamicImports"] = 268435456] = "PKG_DynamicImports";
    EPackageFlags[EPackageFlags["PKG_RuntimeGenerated"] = 536870912] = "PKG_RuntimeGenerated";
    EPackageFlags[EPackageFlags["PKG_ReloadingForCooker"] = 1073741824] = "PKG_ReloadingForCooker";
    EPackageFlags[EPackageFlags["PKG_FilterEditorOnly"] = 2147483648] = "PKG_FilterEditorOnly";
})(EPackageFlags = exports.EPackageFlags || (exports.EPackageFlags = {}));
