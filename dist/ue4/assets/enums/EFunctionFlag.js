"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFunctionFlags = void 0;
/**
 * EFunctionFlags
 * @enum
 */
var EFunctionFlags;
(function (EFunctionFlags) {
    EFunctionFlags[EFunctionFlags["FUNC_None"] = 0] = "FUNC_None";
    EFunctionFlags[EFunctionFlags["FUNC_Final"] = 1] = "FUNC_Final";
    EFunctionFlags[EFunctionFlags["FUNC_RequiredAPI"] = 2] = "FUNC_RequiredAPI";
    EFunctionFlags[EFunctionFlags["FUNC_BlueprintAuthorityOnly"] = 4] = "FUNC_BlueprintAuthorityOnly";
    EFunctionFlags[EFunctionFlags["FUNC_BlueprintCosmetic"] = 8] = "FUNC_BlueprintCosmetic";
    // FUNC_				(0x00000010u),	 // unused.
    // FUNC_				(0x00000020u),	 // unused.
    EFunctionFlags[EFunctionFlags["FUNC_Net"] = 64] = "FUNC_Net";
    EFunctionFlags[EFunctionFlags["FUNC_NetReliable"] = 128] = "FUNC_NetReliable";
    EFunctionFlags[EFunctionFlags["FUNC_NetRequest"] = 256] = "FUNC_NetRequest";
    EFunctionFlags[EFunctionFlags["FUNC_Exec"] = 512] = "FUNC_Exec";
    EFunctionFlags[EFunctionFlags["FUNC_Native"] = 1024] = "FUNC_Native";
    EFunctionFlags[EFunctionFlags["FUNC_Event"] = 2048] = "FUNC_Event";
    EFunctionFlags[EFunctionFlags["FUNC_NetResponse"] = 4096] = "FUNC_NetResponse";
    EFunctionFlags[EFunctionFlags["FUNC_Static"] = 8192] = "FUNC_Static";
    EFunctionFlags[EFunctionFlags["FUNC_NetMulticast"] = 16384] = "FUNC_NetMulticast";
    EFunctionFlags[EFunctionFlags["FUNC_UbergraphFunction"] = 32768] = "FUNC_UbergraphFunction";
    EFunctionFlags[EFunctionFlags["FUNC_MulticastDelegate"] = 65536] = "FUNC_MulticastDelegate";
    EFunctionFlags[EFunctionFlags["FUNC_Public"] = 131072] = "FUNC_Public";
    EFunctionFlags[EFunctionFlags["FUNC_Private"] = 262144] = "FUNC_Private";
    EFunctionFlags[EFunctionFlags["FUNC_Protected"] = 524288] = "FUNC_Protected";
    EFunctionFlags[EFunctionFlags["FUNC_Delegate"] = 1048576] = "FUNC_Delegate";
    EFunctionFlags[EFunctionFlags["FUNC_NetServer"] = 2097152] = "FUNC_NetServer";
    EFunctionFlags[EFunctionFlags["FUNC_HasOutParms"] = 4194304] = "FUNC_HasOutParms";
    EFunctionFlags[EFunctionFlags["FUNC_HasDefaults"] = 8388608] = "FUNC_HasDefaults";
    EFunctionFlags[EFunctionFlags["FUNC_NetClient"] = 16777216] = "FUNC_NetClient";
    EFunctionFlags[EFunctionFlags["FUNC_DLLImport"] = 33554432] = "FUNC_DLLImport";
    EFunctionFlags[EFunctionFlags["FUNC_BlueprintCallable"] = 67108864] = "FUNC_BlueprintCallable";
    EFunctionFlags[EFunctionFlags["FUNC_BlueprintEvent"] = 134217728] = "FUNC_BlueprintEvent";
    EFunctionFlags[EFunctionFlags["FUNC_BlueprintPure"] = 268435456] = "FUNC_BlueprintPure";
    EFunctionFlags[EFunctionFlags["FUNC_EditorOnly"] = 536870912] = "FUNC_EditorOnly";
    EFunctionFlags[EFunctionFlags["FUNC_Const"] = 1073741824] = "FUNC_Const";
    EFunctionFlags[EFunctionFlags["FUNC_NetValidate"] = 2147483648] = "FUNC_NetValidate";
    EFunctionFlags[EFunctionFlags["FUNC_AllFlags"] = 4294967295] = "FUNC_AllFlags";
})(EFunctionFlags = exports.EFunctionFlags || (exports.EFunctionFlags = {}));
