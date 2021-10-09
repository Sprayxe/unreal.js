import { UObject } from "../UObject";
import { ETickingGroup } from "../../enums/ETickingGroup";
import { UProperty } from "../../../../util/decorators/UProperty";
import { FName } from "../../../objects/uobject/FName";
import { Lazy } from "../../../../util/Lazy";
import { FPackageIndex } from "../../../objects/uobject/ObjectResource";
import { USceneComponent } from "../components/USceneComponent";
import { FMulticastScriptDelegate } from "../../../objects/uobject/ScriptDelegates";
import { UActorComponent } from "../components/UActorComponent";

export enum EAutoReceiveInput {
    Disabled,
    Player0,
    Player1,
    Player2,
    Player3,
    Player4,
    Player5,
    Player6,
    Player7
}

export enum ESpawnActorCollisionHandlingMethod {
    Undefined,
    AlwaysSpawn,
    AdjustIfPossibleButAlwaysSpawn,
    AdjustIfPossibleButDontSpawnIfColliding,
    DontSpawnIfColliding
}

export enum ENetDormancy {
    DORM_Never,
    DORM_Awake,
    DORM_DormantAll,
    DORM_DormantPartial,
    DORM_Initial
}

export enum ENetRole {
    ROLE_None,
    ROLE_SimulatedProxy,
    ROLE_AutonomousProxy,
    ROLE_Authority
}

export class FTickFunction {
    public TickGroup: ETickingGroup = null
    public EndTickGroupETickingGroup = null
    public bTickEvenWhenPaused: boolean = null
    public bCanEverTick: boolean = null
    public bStartWithTickEnabled: boolean = null
    public bAllowTickOnDedicatedServer: boolean = null
    public TickInterval: number = null
}

export class FActorTickFunction extends FTickFunction {
}

export class AActor extends UObject {
    public PrimaryActorTick: FActorTickFunction = null
    public bNetTemporary = null
    public bNetStartup = null
    public bOnlyRelevantToOwner = null
    public bAlwaysRelevant = null
    public bReplicateMovement = null
    public bHidden = null
    public bTearOff = null
    public bForceNetAddressable = null
    public bExchangedRoles = null
    public bNetLoadOnClient = null
    public bNetUseOwnerRelevancy = null
    public bRelevantForNetworkReplays = null
    public bRelevantForLevelBounds = null
    public bReplayRewindable = null
    public bAllowTickBeforeBeginPlay = null
    public bAutoDestroyWhenFinished = null
    public bCanBeDamaged = null
    public bBlockInput = null
    public bCollideWhenPlacing = null
    public bFindCameraComponentWhenViewTarget = null
    public bGenerateOverlapEventsDuringLevelStreaming = null
    public bIgnoresOriginShifting = null
    public bEnableAutoLODGeneration = null
    public bIsEditorOnlyActor = null
    public bActorSeamlessTraveled = null
    public bReplicates = null
    public bCanBeInCluster = null
    public bAllowReceiveTickEventOnDedicatedServer = null
    public bActorEnableCollision = null
    public bActorIsBeingDestroyed = null
    /*public EActorUpdateOverlapsMethod UpdateOverlapsMethodDuringLevelStreaming = null
    public EActorUpdateOverlapsMethod DefaultUpdateOverlapsMethodDuringLevelStreaming = null
    public ENetRole RemoteRole = null
    public FRepMovement ReplicatedMovement = null*/
    @UProperty({skipPrevious: 4})
    public InitialLifeSpan: number = null
    public CustomTimeDilation: number = null
    //public FRepAttachment AttachmentReplication = null
    @UProperty({skipPrevious: 1})
    public Owner: Lazy<AActor> = null
    public NetDriverName: FName = null
    public Role: ENetRole = null
    public NetDormancy: ENetDormancy = null
    public SpawnCollisionHandlingMethod: ESpawnActorCollisionHandlingMethod = null
    public AutoReceiveInput: EAutoReceiveInput = null
    public InputPriority: number = null
    public InputComponent: FPackageIndex /*InputComponent*/ = null
    public NetCullDistanceSquared: number = null
    public NetTag: number = null
    public NetUpdateFrequency: number = null
    public MinNetUpdateFrequency: number = null
    public NetPriority: number = null
    public Instigator: FPackageIndex /*Pawn*/ = null
    public Children: Lazy<AActor>[] = null
    public RootComponent: Lazy<USceneComponent> = null
    public ControllingMatineeActors: FPackageIndex[] /*MatineeActor[]*/ = null
    public Layers: FName[] = null
    public ParentComponent: FPackageIndex /*WeakObjectProperty ChildActorComponent*/ = null
    public Tags: FName[] = null
    public OnTakeAnyDamage: FMulticastScriptDelegate = null
    public OnTakePointDamage: FMulticastScriptDelegate = null
    public OnTakeRadialDamage: FMulticastScriptDelegate = null
    public OnActorBeginOverlap: FMulticastScriptDelegate = null
    public OnActorEndOverlap: FMulticastScriptDelegate = null
    public OnBeginCursorOver: FMulticastScriptDelegate = null
    public OnEndCursorOver: FMulticastScriptDelegate = null
    public OnClicked: FMulticastScriptDelegate = null
    public OnReleased: FMulticastScriptDelegate = null
    public OnInputTouchBegin: FMulticastScriptDelegate = null
    public OnInputTouchEnd: FMulticastScriptDelegate = null
    public OnInputTouchEnter: FMulticastScriptDelegate = null
    public OnInputTouchLeave: FMulticastScriptDelegate = null
    public OnActorHit: FMulticastScriptDelegate = null
    public OnDestroyed: FMulticastScriptDelegate = null
    public OnEndPlay: FMulticastScriptDelegate = null
    public InstanceComponents: Lazy<UActorComponent>[] = null
    public BlueprintCreatedComponents: Lazy<UActorComponent>[] = null
}