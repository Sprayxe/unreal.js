"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EObjectFlags = void 0;
/**
 * EObjectFlags
 * @enum
 */
var EObjectFlags;
(function (EObjectFlags) {
    // Do not add new flags unless they truly belong here. There are alternatives.
    // if you change any the bit of any of the RF_Load flags, then you will need legacy serialization
    EObjectFlags[EObjectFlags["RF_NoFlags"] = 0] = "RF_NoFlags";
    // This first group of flags mostly has to do with what kind of object it is. Other than transient, these are the persistent object flags.
    // The garbage collector also tends to look at these.
    EObjectFlags[EObjectFlags["RF_Public"] = 1] = "RF_Public";
    EObjectFlags[EObjectFlags["RF_Standalone"] = 2] = "RF_Standalone";
    EObjectFlags[EObjectFlags["RF_MarkAsNative"] = 4] = "RF_MarkAsNative";
    EObjectFlags[EObjectFlags["RF_Transactional"] = 8] = "RF_Transactional";
    EObjectFlags[EObjectFlags["RF_ClassDefaultObject"] = 16] = "RF_ClassDefaultObject";
    EObjectFlags[EObjectFlags["RF_ArchetypeObject"] = 32] = "RF_ArchetypeObject";
    EObjectFlags[EObjectFlags["RF_Transient"] = 64] = "RF_Transient";
    // This group of flags is primarily concerned with garbage collection.
    EObjectFlags[EObjectFlags["RF_MarkAsRootSet"] = 128] = "RF_MarkAsRootSet";
    EObjectFlags[EObjectFlags["RF_TagGarbageTemp"] = 256] = "RF_TagGarbageTemp";
    // The group of flags tracks the stages of the lifetime of a uobject
    EObjectFlags[EObjectFlags["RF_NeedInitialization"] = 512] = "RF_NeedInitialization";
    EObjectFlags[EObjectFlags["RF_NeedLoad"] = 1024] = "RF_NeedLoad";
    EObjectFlags[EObjectFlags["RF_KeepForCooker"] = 2048] = "RF_KeepForCooker";
    EObjectFlags[EObjectFlags["RF_NeedPostLoad"] = 4096] = "RF_NeedPostLoad";
    EObjectFlags[EObjectFlags["RF_NeedPostLoadSubobjects"] = 8192] = "RF_NeedPostLoadSubobjects";
    EObjectFlags[EObjectFlags["RF_NewerVersionExists"] = 16384] = "RF_NewerVersionExists";
    EObjectFlags[EObjectFlags["RF_BeginDestroyed"] = 32768] = "RF_BeginDestroyed";
    EObjectFlags[EObjectFlags["RF_FinishDestroyed"] = 65536] = "RF_FinishDestroyed";
    // Misc. Flags
    EObjectFlags[EObjectFlags["RF_BeingRegenerated"] = 131072] = "RF_BeingRegenerated";
    EObjectFlags[EObjectFlags["RF_DefaultSubObject"] = 262144] = "RF_DefaultSubObject";
    EObjectFlags[EObjectFlags["RF_WasLoaded"] = 524288] = "RF_WasLoaded";
    EObjectFlags[EObjectFlags["RF_TextExportTransient"] = 1048576] = "RF_TextExportTransient";
    EObjectFlags[EObjectFlags["RF_LoadCompleted"] = 2097152] = "RF_LoadCompleted";
    EObjectFlags[EObjectFlags["RF_InheritableComponentTemplate"] = 4194304] = "RF_InheritableComponentTemplate";
    EObjectFlags[EObjectFlags["RF_DuplicateTransient"] = 8388608] = "RF_DuplicateTransient";
    EObjectFlags[EObjectFlags["RF_StrongRefOnFrame"] = 16777216] = "RF_StrongRefOnFrame";
    EObjectFlags[EObjectFlags["RF_NonPIEDuplicateTransient"] = 33554432] = "RF_NonPIEDuplicateTransient";
    EObjectFlags[EObjectFlags["RF_Dynamic"] = 67108864] = "RF_Dynamic";
    EObjectFlags[EObjectFlags["RF_WillBeLoaded"] = 134217728] = "RF_WillBeLoaded";
    EObjectFlags[EObjectFlags["RF_HasExternalPackage"] = 268435456] = "RF_HasExternalPackage"; ///< This object has an external package assigned and should look it up when getting the outermost package
})(EObjectFlags = exports.EObjectFlags || (exports.EObjectFlags = {}));
