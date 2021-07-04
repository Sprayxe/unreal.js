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
exports.UBlueprintGeneratedClass_Properties = void 0;
const ObjectResource_1 = require("../../objects/uobject/ObjectResource");
const UFunction_1 = require("./UFunction");
const UProperty_1 = require("../../../util/decorators/UProperty");
const UClass_1 = require("./UClass");
/**
 * UBlueprintGeneratedClass_Properties
 * @extends {UClass}
 */
class UBlueprintGeneratedClass_Properties extends UClass_1.UClass {
    constructor() {
        super(...arguments);
        /**
         * NumReplicatedProperties
         * @type {number}
         * @public
         */
        this.NumReplicatedProperties = null;
        /**
         * bHasNativizedParent
         * @type {boolean}
         * @public
         */
        this.bHasNativizedParent = null;
        /**
         * bHasCookedComponentInstancingData
         * @type {boolean}
         * @public
         */
        this.bHasCookedComponentInstancingData = null;
        /**
         * DynamicBindingObjects
         * @type {Array<FPackageIndex>}
         * @public
         */
        this.DynamicBindingObjects = null;
        /**
         * ComponentTemplates
         * @type {Array<UActorComponent>}
         * @public
         */
        this.ComponentTemplates = null;
        /**
         * Timelines
         * @type {Array<UTimelineTemplate>}
         * @public
         */
        this.Timelines = null;
        //public List<FBPComponentClassOverride> ComponentClassOverrides;
        /**
         * SimpleConstructionScript
         * @type {FPackageIndex}
         * @public
         */
        this.SimpleConstructionScript = null;
        /**
         * InheritableComponentHandler
         * @type {FPackageIndex}
         * @public
         */
        this.InheritableComponentHandler = null;
        /**
         * UberGraphFramePointerProperty
         * @type {FPackageIndex}
         * @public
         */
        this.UberGraphFramePointerProperty = null;
        /**
         * UberGraphFunction
         * @type {UFunction}
         * @public
         */
        this.UberGraphFunction = null;
        //public Map<FName, FBlueprintCookedComponentInstancingData> CookedComponentInstancingData;
    }
}
__decorate([
    UProperty_1.UProperty({ skipPrevious: 1 }),
    __metadata("design:type", ObjectResource_1.FPackageIndex)
], UBlueprintGeneratedClass_Properties.prototype, "SimpleConstructionScript", void 0);
__decorate([
    UProperty_1.UProperty({ skipNext: 1 }),
    __metadata("design:type", UFunction_1.UFunction)
], UBlueprintGeneratedClass_Properties.prototype, "UberGraphFunction", void 0);
exports.UBlueprintGeneratedClass_Properties = UBlueprintGeneratedClass_Properties;
