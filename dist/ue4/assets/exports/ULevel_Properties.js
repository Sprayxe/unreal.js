"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ULevel_Properties = void 0;
const UObject_1 = require("./UObject");
const UProperty_1 = require("../../../util/decorators/UProperty");
/**
 * ULevel_Properties
 * @extends {UObject}
 */
class ULevel_Properties extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * OwningWorld
         * @type {FPackageIndex}
         * @public
         */
        this.OwningWorld = null;
        /**
         * Model
         * @type {FPackageIndex}
         * @public
         */
        this.Model = null;
        /**
         * ModelComponents
         * @type {Array<FPackageIndex>}
         * @public
         */
        this.ModelComponents = null;
        /**
         * ActorCluster
         * @type {FPackageIndex}
         * @public
         */
        this.ActorCluster = null;
        /**
         * NumTextureStreamingUnbuiltComponents
         * @type {number}
         * @public
         */
        this.NumTextureStreamingUnbuiltComponents = null;
        /**
         * NumTextureStreamingDirtyResources
         * @type {number}
         * @public
         */
        this.NumTextureStreamingDirtyResources = null;
        /**
         * LevelScriptActor
         * @type {FPackageIndex}
         * @public
         */
        this.LevelScriptActor = null;
        /**
         * NavListStart
         * @type {FPackageIndex}
         * @public
         */
        this.NavListStart = null;
        /**
         * NavListEnd
         * @type {FPackageIndex}
         * @public
         */
        this.NavListEnd = null;
        /**
         * NavDataChunks
         * @type {Array<FPackageIndex>}
         * @public
         */
        this.NavDataChunks = null;
        /**
         * LightmapTotalSize
         * @type {number}
         * @public
         */
        this.LightmapTotalSize = null;
        /**
         * ShadowmapTotalSize
         * @type {number}
         * @public
         */
        this.ShadowmapTotalSize = null;
        /**
         * StaticNavigableGeometry
         * @type {Array<FVector>}
         * @public
         */
        this.StaticNavigableGeometry = null;
        /**
         * StreamingTextureGuids
         * @type {FGuid}
         * @public
         */
        this.StreamingTextureGuids = null;
        /**
         * LevelBuildDataId
         * @type {FGuid}
         * @public
         */
        this.LevelBuildDataId = null;
        /**
         * MapBuildData
         * @type {FPackageIndex}
         * @public
         */
        this.MapBuildData = null;
        /**
         * LightBuildLevelOffset
         * @type {FIntVector}
         * @public
         */
        this.LightBuildLevelOffset = null;
        /**
         * bIsLightingScenario
         * @type {boolean}
         * @public
         */
        this.bIsLightingScenario = null;
        /**
         * bTextureStreamingRotationChanged
         * @type {boolean}
         * @public
         */
        this.bTextureStreamingRotationChanged = null;
        /**
         * bStaticComponentsRegisteredInStreamingManager
         * @type {boolean}
         * @public
         */
        this.bStaticComponentsRegisteredInStreamingManager = null;
        /**
         * bIsVisible
         * @type {boolean}
         * @public
         */
        this.bIsVisible = null;
        /**
         * WorldSettings
         * @type {FPackageIndex}
         * @public
         */
        this.WorldSettings = null;
        /**
         * AssetUserData
         * @type {Array<FPackageIndex>}
         * @public
         */
        this.AssetUserData = null;
        //public DestroyedReplicatedStaticActors: FReplicatedStaticActorDestructionInfo[]
    }
}
__decorate([
    UProperty_1.UProperty({ skipNext: 1 }),
    __metadata("design:type", Array)
], ULevel_Properties.prototype, "AssetUserData", void 0);
exports.ULevel_Properties = ULevel_Properties;
