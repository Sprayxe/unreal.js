"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USCS_Node = exports.FBlueprintComponentChangedPropertyInfo = exports.FBlueprintCookedComponentInstancingData = void 0;
const UObject_1 = require("./UObject");
/**
 * FBlueprintCookedComponentInstancingData
 */
class FBlueprintCookedComponentInstancingData {
    constructor() {
        /**
         * ChangedPropertyList
         * @type {Array<FBlueprintComponentChangedPropertyInfo>}
         * @public
         */
        this.ChangedPropertyList = null;
        /**
         * bHasValidCookedData
         * @type {boolean}
         * @public
         */
        this.bHasValidCookedData = null;
    }
}
exports.FBlueprintCookedComponentInstancingData = FBlueprintCookedComponentInstancingData;
/**
 * FBlueprintComponentChangedPropertyInfo
 */
class FBlueprintComponentChangedPropertyInfo {
    constructor() {
        /**
         * PropertyName
         * @type {FName}
         * @public
         */
        this.PropertyName = null;
        /**
         * ArrayIndex
         * @type {number}
         * @public
         */
        this.ArrayIndex = null;
        /**
         * PropertyScope
         * @type {UStruct}
         * @public
         */
        this.PropertyScope = null;
    }
}
exports.FBlueprintComponentChangedPropertyInfo = FBlueprintComponentChangedPropertyInfo;
/**
 * USCS_Node
 * @extends {UObject}
 */
class USCS_Node extends UObject_1.UObject {
    constructor() {
        super(...arguments);
        /**
         * ComponentClass
         * @type {UClass}
         * @public
         */
        this.ComponentClass = null;
        /**
         * ComponentTemplate
         * @type {UActorComponent}
         * @public
         */
        this.ComponentTemplate = null;
        /**
         * CookedComponentInstancingData
         * @type {FBlueprintCookedComponentInstancingData}
         * @public
         */
        this.CookedComponentInstancingData = null;
        /**
         * AttachToName
         * @type {FName}
         * @public
         */
        this.AttachToName = null;
        /**
         * ParentComponentOrVariableName
         * @type {FName}
         * @public
         */
        this.ParentComponentOrVariableName = null;
        /**
         * ParentComponentOwnerClassName
         * @type {FName}
         * @public
         */
        this.ParentComponentOwnerClassName = null;
        /**
         * bIsParentComponentNative
         * @type {boolean}
         * @public
         */
        this.bIsParentComponentNative = null;
        /**
         * ChildNodes
         * @type {Array<USCS_Node>}
         * @public
         */
        this.ChildNodes = null;
        /**
         * MetaDataArray
         * @type {Array<FBPVariableMetaDataEntry>}
         * @public
         */
        this.MetaDataArray = null;
        /**
         * VariableGuid
         * @type {FGuid}
         * @public
         */
        this.VariableGuid = null;
        /**
         * InternalVariableName
         * @type {FName}
         * @public
         */
        this.InternalVariableName = null;
    }
}
exports.USCS_Node = USCS_Node;
