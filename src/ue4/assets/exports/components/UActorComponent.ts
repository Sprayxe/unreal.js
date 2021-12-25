import { UObject } from "../UObject";
import { FName } from "../../../objects/uobject/FName";
import { FGuid } from "../../../objects/core/misc/Guid";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { FMulticastScriptDelegate } from "../../../objects/uobject/ScriptDelegates";
import { UProperty } from "../../../../util/decorators/UProperty";

/**
 * EComponentCreationMethod
 * @enum
 */
export enum EComponentCreationMethod {
    Native,
    SimpleConstructionScript,
    UserConstructionScript,
    Instance
}

/**
 * FSimpleMemberReference
 */
export class FSimpleMemberReference {
    /**
     * MemberParent
     * @type {UObject}
     * @public
     */
    public MemberParent: UObject

    /**
     * MemberName
     * @type {FName}
     * @public
     */
    public MemberName: FName

    /**
     * MemberGuid
     * @type {FGuid}
     * @public
     */
    public MemberGuid: FGuid
}

/**
 * UActorComponent
 * @extends {UObject}
 */
export class UActorComponent extends UObject {
    //public FActorComponentTickFunction PrimaryComponentTick;
    /**
     * ComponentTags
     * @type {Array<FName>}
     * @public
     */
    @UProperty({ skipPrevious: 1 })
    public ComponentTags: FName[]

    /**
     * AssetUserData
     * @type {Array<FPackageIndex>}
     * @public
     */
    public AssetUserData: FPackageIndex[]

    /**
     * UCSSerializationIndex
     * @type {number}
     * @public
     */
    public UCSSerializationIndex: number

    /**
     * bNetAddressable
     * @type {boolean}
     * @public
     */
    public bNetAddressable: boolean

    /**
     * bReplicates
     * @type {boolean}
     * @public
     */
    public bReplicates: boolean

    /**
     * bAutoActivate
     * @type {boolean}
     * @public
     */
    public bAutoActivate: boolean

    /**
     * bIsActive
     * @type {boolean}
     * @public
     */
    public bIsActive: boolean

    /**
     * bEditableWhenInherited
     * @type {boolean}
     * @public
     */
    public bEditableWhenInherited: boolean

    /**
     * bCanEverAffectNavigation
     * @type {boolean}
     * @public
     */
    public bCanEverAffectNavigation: boolean

    /**
     * bIsEditorOnly
     * @type {boolean}
     * @public
     */
    public bIsEditorOnly: boolean

    /**
     * CreationMethod
     * @type {EComponentCreationMethod}
     * @public
     */
    public CreationMethod: EComponentCreationMethod

    /**
     * OnComponentActivated
     * @type {FMulticastScriptDelegate}
     * @public
     */
    public OnComponentActivated: FMulticastScriptDelegate

    /**
     * OnComponentDeactivated
     * @type {FMulticastScriptDelegate}
     * @public
     */
    public OnComponentDeactivated: FMulticastScriptDelegate

    /**
     * UCSModifiedProperties
     * @type {Array<FSimpleMemberReference>}
     * @public
     */
    public UCSModifiedProperties: FSimpleMemberReference[]
}