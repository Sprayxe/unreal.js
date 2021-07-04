"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CosmeticMetaTagContainer = exports.ScriptedActionVariant = exports.SocketTransformVariant = exports.FoleySoundVariant = exports.SoundVariant = exports.ManagedParticleParamVariant = exports.FFortPortableSoftParticles = exports.ManagedParticleSwapVariant = exports.ParticleParamterVariant = exports.ParticleVariant = exports.VariantParticleSystemInitializerData = exports.MaterialParamterDef = exports.MaterialVariants = exports.MeshVariant = exports.BaseVariantDef = void 0;
class BaseVariantDef {
    get backendVariantName() {
        return this.CustomizationVariantTag != null
            ? this.CustomizationVariantTag.toString().substring("Cosmetics.Variant.Property.".length)
            : null;
    }
}
exports.BaseVariantDef = BaseVariantDef;
class MeshVariant {
}
exports.MeshVariant = MeshVariant;
class MaterialVariants {
}
exports.MaterialVariants = MaterialVariants;
class MaterialParamterDef {
}
exports.MaterialParamterDef = MaterialParamterDef;
class VariantParticleSystemInitializerData {
}
exports.VariantParticleSystemInitializerData = VariantParticleSystemInitializerData;
class ParticleVariant {
}
exports.ParticleVariant = ParticleVariant;
class ParticleParamterVariant {
}
exports.ParticleParamterVariant = ParticleParamterVariant;
class ManagedParticleSwapVariant {
}
exports.ManagedParticleSwapVariant = ManagedParticleSwapVariant;
class FFortPortableSoftParticles {
}
exports.FFortPortableSoftParticles = FFortPortableSoftParticles;
class ManagedParticleParamVariant {
}
exports.ManagedParticleParamVariant = ManagedParticleParamVariant;
class SoundVariant {
}
exports.SoundVariant = SoundVariant;
class FoleySoundVariant {
}
exports.FoleySoundVariant = FoleySoundVariant;
class SocketTransformVariant {
}
exports.SocketTransformVariant = SocketTransformVariant;
class ScriptedActionVariant {
}
exports.ScriptedActionVariant = ScriptedActionVariant;
class CosmeticMetaTagContainer {
}
exports.CosmeticMetaTagContainer = CosmeticMetaTagContainer;
