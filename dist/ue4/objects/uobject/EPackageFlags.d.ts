/**
 * EPackageFlags
 * @enum
 */
export declare enum EPackageFlags {
    PKG_None = 0,
    PKG_NewlyCreated = 1,
    PKG_ClientOptional = 2,
    PKG_ServerSideOnly = 4,
    PKG_CompiledIn = 16,
    PKG_ForDiffing = 32,
    PKG_EditorOnly = 64,
    PKG_Developer = 128,
    PKG_UncookedOnly = 256,
    PKG_UnversionedProperties = 8192,
    PKG_ContainsMapData = 16384,
    PKG_Compiling = 65536,
    PKG_ContainsMap = 131072,
    PKG_RequiresLocalizationGather = 262144,
    PKG_PlayInEditor = 1048576,
    PKG_ContainsScript = 2097152,
    PKG_DisallowExport = 4194304,
    PKG_DynamicImports = 268435456,
    PKG_RuntimeGenerated = 536870912,
    PKG_ReloadingForCooker = 1073741824,
    PKG_FilterEditorOnly = 2147483648
}
