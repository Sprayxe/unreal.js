import { UObject } from "../UObject";
import { FName } from "../../../objects/uobject/FName";
import { FGuid } from "../../../objects/core/misc/Guid";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FMulticastScriptDelegate } from "../../../objects/uobject/ScriptDelegates";
/**
 * EComponentCreationMethod
 * @enum
 */
export declare enum EComponentCreationMethod {
    Native = 0,
    SimpleConstructionScript = 1,
    UserConstructionScript = 2,
    Instance = 3
}
/**
 * FSimpleMemberReference
 */
export declare class FSimpleMemberReference {
    /**
     * MemberParent
     * @type {UObject}
     * @public
     */
    MemberParent: UObject;
    /**
     * MemberName
     * @type {FName}
     * @public
     */
    MemberName: FName;
    /**
     * MemberGuid
     * @type {FGuid}
     * @public
     */
    MemberGuid: FGuid;
}
/**
 * UActorComponent
 * @extends {UObject}
 */
export declare class UActorComponent extends UObject {
    /**
     * ComponentTags
     * @type {Array<FName>}
     * @public
     */
    ComponentTags: FName[];
    /**
     * AssetUserData
     * @type {Array<FPackageIndex>}
     * @public
     */
    AssetUserData: FPackageIndex[];
    /**
     * UCSSerializationIndex
     * @type {number}
     * @public
     */
    UCSSerializationIndex: number;
    /**
     * bNetAddressable
     * @type {boolean}
     * @public
     */
    bNetAddressable: boolean;
    /**
     * bReplicates
     * @type {boolean}
     * @public
     */
    bReplicates: boolean;
    /**
     * bAutoActivate
     * @type {boolean}
     * @public
     */
    bAutoActivate: boolean;
    /**
     * bIsActive
     * @type {boolean}
     * @public
     */
    bIsActive: boolean;
    /**
     * bEditableWhenInherited
     * @type {boolean}
     * @public
     */
    bEditableWhenInherited: boolean;
    /**
     * bCanEverAffectNavigation
     * @type {boolean}
     * @public
     */
    bCanEverAffectNavigation: boolean;
    /**
     * bIsEditorOnly
     * @type {boolean}
     * @public
     */
    bIsEditorOnly: boolean;
    /**
     * CreationMethod
     * @type {EComponentCreationMethod}
     * @public
     */
    CreationMethod: EComponentCreationMethod;
    /**
     * OnComponentActivated
     * @type {FMulticastScriptDelegate}
     * @public
     */
    OnComponentActivated: FMulticastScriptDelegate;
    /**
     * OnComponentDeactivated
     * @type {FMulticastScriptDelegate}
     * @public
     */
    OnComponentDeactivated: FMulticastScriptDelegate;
    /**
     * UCSModifiedProperties
     * @type {Array<FSimpleMemberReference>}
     * @public
     */
    UCSModifiedProperties: FSimpleMemberReference[];
}
