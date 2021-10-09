import { UActorComponent } from "./UActorComponent"
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { Lazy } from "../../../../util/Lazy";
import { FName } from "../../../objects/uobject/FName";
import { FRotator } from "../../../objects/core/math/FRotator";
import { EDetailMode } from "../../../../fort/enums/EDetailMode";
import { FMulticastScriptDelegate } from "../../../objects/uobject/ScriptDelegates";
import { FVector } from "../../../objects/core/math/FVector";

export enum EComponentMobility {
    Static,
    Stationary,
    Movable
}

export class USceneComponent extends UActorComponent {
    public PhysicsVolume: FPackageIndex /*WeakObjectProperty PhysicsVolume*/ = null
    public AttachParent: Lazy<USceneComponent> = null
    public AttachSocketName: FName = null
    public AttachChildren: Lazy<USceneComponent>[] = null
    public ClientAttachedChildren: Lazy<USceneComponent> = null
    public RelativeLocation: FVector = null
    public RelativeRotation: FRotator = null
    public RelativeScale3D: FVector = null
    public ComponentVelocity: FVector = null
    public bComponentToWorldUpdated: boolean = null
    public bAbsoluteLocation: boolean = null
    public bAbsoluteRotation: boolean = null
    public bAbsoluteScale: boolean = null
    public bVisible: boolean = null
    public bShouldBeAttached: boolean = null
    public bShouldSnapLocationWhenAttached: boolean = null
    public bShouldSnapRotationWhenAttached: boolean = null
    public bShouldUpdatePhysicsVolume: boolean = null
    public bHiddenInGame: boolean = null
    public bBoundsChangeTriggersStreamingDataRebuild: boolean = null
    public bUseAttachParentBound: boolean = null
    public Mobility: EComponentMobility = null
    public DetailMode: EDetailMode = null
    public PhysicsVolumeChangedDelegate: FMulticastScriptDelegate = null
}