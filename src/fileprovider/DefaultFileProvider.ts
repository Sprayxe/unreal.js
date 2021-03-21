import { GameFile } from "../ue4/pak/GameFile";
import { UnrealMap } from "../util/UnrealMap";
import { PakFileProvider } from "./PakFileProvider";
import { PakFileReader } from "../ue4/pak/PakFileReader";
import { FGuid } from "../ue4/objects/core/misc/Guid";
import { FIoStoreReader } from "../ue4/io/IoStore";

export class DefaultFileProvider extends PakFileProvider {
    folder: string[]
    game: number
    localFiles = new UnrealMap<string, Buffer>()
    _files = new UnrealMap<string, GameFile>()
    _unloadedPaks: PakFileReader[] = []
    _requiredKeys: FGuid[] = []
    _keys = new UnrealMap<FGuid, Buffer>()
    _mountedPaks: PakFileReader[] = []
    _mountedIoStoreReaders: FIoStoreReader[] = []

    constructor() {
        super();
    }
}