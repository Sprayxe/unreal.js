import { FArchive } from "../reader/FArchive";
import { Game } from "../versions/Game";
import { FMappedName, FMappedName_EType } from "../asyncloading2/AsyncLoading2";
import { FNameMap } from "../asyncloading2/FNameMap";
import { Utils } from "../../util/Utils";
import Collection from "@discordjs/collection";

type FSourceToLocalizedPackageIdMap = Array<FIoContainerHeaderPackageRedirect>
type FCulturePackageMap = Collection<String, FSourceToLocalizedPackageIdMap>

export class FFilePackageStoreEntry {
    public exportCount: number = 0
    public exportBundleCount: number = 0
    public importedPackages: bigint[]

    // public shaderMapHashes: Buffer[]

    public constructor(Ar: FArchive) {
        if (Ar.game >= Game.GAME_UE5_BASE) {
            this.exportCount = Ar.readInt32()
            this.exportBundleCount = Ar.readInt32()
            this.importedPackages = FFilePackageStoreEntry.readCArrayView(Ar)
            Ar.pos += 8 // shaderMapHashes
        }
    }

    private static readCArrayView<T>(Ar: FArchive /*, init: (Ar: FArchive) => T*/): T[] {
        const initialPos = Ar.pos
        const arrayNum = Ar.readInt32()
        const offsetToDataFromThis = Ar.readInt32()
        if (arrayNum <= 0)
            return []
        const continuePos = Ar.pos
        Ar.pos = initialPos + offsetToDataFromThis
        const result = new Array(arrayNum)
        for (let i = 0; i < arrayNum; ++i) {
            result[i] = Ar.readUInt64() // init(Ar)
        }
        Ar.pos = continuePos
        return result
    }
}

export class FIoContainerHeaderPackageRedirect {
    public sourcePackageId: bigint
    public targetPackageId: bigint
    public sourcePackageName?: FMappedName

    public constructor(Ar: FArchive) {
        this.sourcePackageId = Ar.readUInt64()
        this.targetPackageId = Ar.readUInt64()
        this.sourcePackageName = Ar.game >= Game.GAME_UE5_BASE ? new FMappedName(Ar) : null
    }
}

export class FIoContainerHeaderLocalizedPackage {
    public sourcePackageId: bigint
    public sourcePackageName?: FMappedName

    public constructor(Ar: FArchive) {
        this.sourcePackageId = Ar.readUInt64()
        this.sourcePackageName = new FMappedName(Ar)
    }
}

export enum EIoContainerHeaderVersion {
    BeforeVersionWasAdded = -1, // Custom constant to indicate pre-UE5 data
    Initial,
    LocalizedPackages,

    Latest = LocalizedPackages
}

export class FIoContainerHeader {
    public static readonly SIGNATURE: number = 0x496f436e

    public containerId: bigint
    public packageCount = 0
    public packageIds: bigint[]
    public storeEntries: FFilePackageStoreEntry[]
    public redirectsNameMap = new FNameMap()
    public localizedPackages?: FIoContainerHeaderLocalizedPackage[] = null
    public culturePackageMap?: FCulturePackageMap = null
    public packageRedirects: FIoContainerHeaderPackageRedirect[]

    public constructor(Ar: FArchive) {
        let version = Ar.game >= Game.GAME_UE5_BASE ? EIoContainerHeaderVersion.Initial : EIoContainerHeaderVersion.BeforeVersionWasAdded
        if (version == EIoContainerHeaderVersion.Initial) {
            const signature = Ar.readInt32()
            if (signature !== FIoContainerHeader.SIGNATURE)
                throw new TypeError(`Invalid container header signature (${FIoContainerHeader.SIGNATURE}): ${signature}`)
            version = Ar.readInt32()
        }
        this.containerId = Ar.readUInt64()
        this.packageCount = Ar.readUInt32()
        if (version == EIoContainerHeaderVersion.BeforeVersionWasAdded) {
            const names = Ar.read(Ar.readInt32())
            const nameHashes = Ar.read(Ar.readInt32())
            if (Utils.bufferIsNotEmpty(names)) {
                this.redirectsNameMap.load(names, nameHashes, FMappedName_EType.Container)
            }
        }
        const pkgLen = Ar.readInt32()
        this.packageIds = new Array(pkgLen)
        for (let i = 0; i < pkgLen; ++i) this.packageIds[i] = Ar.readUInt64()
        const storeEntriesNum = Ar.readInt32()
        const storeEntriesEnd = Ar.pos + storeEntriesNum
        const strsLen = this.packageCount
        this.storeEntries = new Array(strsLen)
        for (let i = 0; i < strsLen; ++i) {
            this.storeEntries[i] = new FFilePackageStoreEntry(Ar)
        }
        Ar.pos = storeEntriesEnd
        if (version >= EIoContainerHeaderVersion.Initial)
            this.redirectsNameMap.load(Ar, FMappedName_EType.Container)
        if (version >= EIoContainerHeaderVersion.LocalizedPackages) {
            const locPkgLen = Ar.readInt32()
            this.localizedPackages = new Array(locPkgLen)
            for (let i = 0; i < locPkgLen; ++i)
                this.localizedPackages[i] = new FIoContainerHeaderLocalizedPackage(Ar)
        } else {
            this.culturePackageMap = new Collection<String, FSourceToLocalizedPackageIdMap>()
            const culPkgLen = Ar.readInt32()
            for (let i = 0; i < culPkgLen; ++i) {
                const key = Ar.readString()
                const valLen = Ar.readInt32()
                const value = new Array(valLen)
                for (let x = 0; x < valLen; ++x) {
                    value[x] = new FIoContainerHeaderPackageRedirect(Ar)
                }
                this.culturePackageMap.set(key, value)
            }
        }
        const pkgRedLen = Ar.readInt32()
        this.packageRedirects = new Array(pkgRedLen)
        for (let i = 0; i < pkgRedLen; ++i)
            this.packageRedirects[i] = new FIoContainerHeaderPackageRedirect(Ar)
    }
}

// https://github.com/FabianFG/JFortniteParse/commit/f4290eca74a73012891f5266f2c846dc2562acb9#diff-4f3637b59bb48138b87dfd324a31bf9bbec05425698578bc5836756c38b66742