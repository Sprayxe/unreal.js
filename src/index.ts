import { UScriptStruct } from "./ue4/assets/exports/UScriptStruct";
import { UStruct } from "./ue4/assets/exports/UStruct";
import { Package } from "./ue4/assets/Package";
import { UTexture2D } from "./ue4/assets/exports/tex/UTexture2D";
import { FileProvider } from "./fileprovider/FileProvider";
import { ReflectionTypeMappingsProvider } from "./ue4/assets/mappings/ReflectionTypeMappingsProvider";
import { UsmapTypeMappingsProvider } from "./ue4/assets/mappings/UsmapTypeMappingsProvider";
import { Game, Ue4Version } from "./ue4/versions/Game";
import { IoPackage } from "./ue4/assets/IoPackage";
import { PakPackage } from "./ue4/assets/PakPackage";
import { FGuid } from "./ue4/objects/core/misc/Guid";
import { Image } from "./ue4/converters/textures/Image";
import { SoundWave } from "./ue4/converters/sounds/SoundWave";
import { WwiseAudio } from "./ue4/converters/sounds/WwiseAudio";
import { Locres } from "./ue4/locres/Locres";
import { FnLanguage } from "./ue4/locres/FnLanguage";
import { FArchive } from "./ue4/reader/FArchive";
import { PakFileReader } from "./ue4/pak/PakFileReader";
import { FAssetArchive } from "./ue4/assets/reader/FAssetArchive";
import { Oodle } from "./oodle/Oodle";
import { FName } from "./ue4/objects/uobject/FName";

// exports for faster and easier imports
export {
    // only here so this shit compiles smh
    Package,
    UStruct,
    UScriptStruct,
    UTexture2D,
    // file provider
    FileProvider,
    FGuid,
    // mappings
    ReflectionTypeMappingsProvider,
    UsmapTypeMappingsProvider,
    // version
    Ue4Version,
    Game,
    // packages
    IoPackage,
    PakPackage,
    // converters
    Image,
    SoundWave,
    WwiseAudio,
    // exports
    Locres,
    FnLanguage,
    // readers
    FArchive,
    FAssetArchive,
    PakFileReader,
    // oodle
    Oodle,
    // other
    FName
}
