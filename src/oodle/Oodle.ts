import * as ffi from "ffi-napi"

export class OodleLibrary {
    static dll = ffi.Library("oo2core_8_win64.dll", {
        OodleLZ_Decompress: ["uint8*", ["int", "uint8*", "size_t", "int", "int", "int", "uint8*", "size_t", "void*", "void*", "void*", "size_t", "int"]]
    })

    static decompress() {
        // code here
    }

    static compress() {
        // code here
    }
}