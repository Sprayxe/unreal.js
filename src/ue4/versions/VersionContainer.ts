import { FCustomVersion } from "../objects/core/serialization/CustomVersion";
import Collection from "@discordjs/collection";
import { Game, Ue4Version } from "./Game";
import { VER_UE4_DETERMINE_BY_GAME } from "./Versions";

export class VersionContainer {
    public static readonly DEFAULT = new VersionContainer()

    public static from(other: VersionContainer) {
        const container = new VersionContainer(other.game, other.ver, other.customVersions, other.optionsOverrides)
        container.explicitVer = other.explicitVer
        return container
    }

    private _game = -1
    public get game() {
        return this._game
    }

    public set game(value: number) {
        this._game = value
        this.initOptions()
    }

    private _ver = -1
    public get ver() {
        return this._ver
    }

    public set ver(value: number) {
        this.explicitVer = value != VER_UE4_DETERMINE_BY_GAME
        this._ver = this.explicitVer ? value : Ue4Version.getArVer(this.game)
        this.initOptions()
    }

    public explicitVer = false
    public customVersions?: FCustomVersion[]
    public readonly options = new Collection<string, boolean>()
    private readonly optionsOverrides?: Collection<string, boolean>

    constructor(game: number = Game.GAME_UE4(Game.LATEST_SUPPORTED_UE4_VERSION),
                ver: number = VER_UE4_DETERMINE_BY_GAME,
                customVersions: FCustomVersion[] = null,
                optionOverrides: Collection<string, boolean> = null) {
        this.optionsOverrides = optionOverrides
        this.game = game
        this.ver = ver
        this.customVersions = customVersions
    }

    private initOptions(): void {
        this.options.clear()
        this.options.set("RawIndexBuffer.HasShouldExpandTo32Bit", this.game >= Game.GAME_UE4(25))
        // TODO GAME_UE5 this.options.set("ShaderMap.UseNewCookedFormat", this.game >= Game.GAME_UE4(25))
        this.options.set("SkeletalMesh.KeepMobileMinLODSettingOnDesktop", this.game >= Game.GAME_UE4(27))
        this.options.set("SkeletalMesh.UseNewCookedFormat", this.game >= Game.GAME_UE4(24))
        this.options.set("StaticMesh.HasLODsShareStaticLighting", this.game < Game.GAME_UE4(15) || this.game >= Game.GAME_UE4(16))
        this.options.set("StaticMesh.HasRayTracingGeometry", this.game >= Game.GAME_UE4(25))
        this.options.set("StaticMesh.HasVisibleInRayTracing", this.game >= Game.GAME_UE4(26))
        this.options.set("StaticMesh.KeepMobileMinLODSettingOnDesktop", this.game >= Game.GAME_UE4(27))
        this.options.set("StaticMesh.UseNewCookedFormat", this.game >= Game.GAME_UE4(23))
        this.options.set("VirtualTextures", this.game >= Game.GAME_UE4(23))

        if (this.optionsOverrides != null) {
            for (const [key, value] of this.optionsOverrides) {
                this.options.set(key, value)
            }
        }
    }

    public get(key: string): boolean {
        return this.options.get(key) || false
    }
}