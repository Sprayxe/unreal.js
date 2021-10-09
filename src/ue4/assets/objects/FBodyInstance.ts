import { FBodyInstanceCore } from "./FBodyInstanceCore";
import { FName } from "../../objects/uobject/FName";
import { ECollisionChannel } from "../enums/ECollisionChannel";
import { FVector } from "../../objects/core/math/FVector";
import { FPackageIndex } from "../../objects/uobject/ObjectResource";

export enum ECollisionEnabled {
    NoCollision,
    QueryOnly,
    PhysicsOnly,
    QueryAndPhysics
}

export enum ESleepFamily { // PhysicsCore
    Normal,
    Sensitive,
    Custom
}

export enum EDOFMode {
    Default,
    SixDOF,
    YZPlane,
    XZPlane,
    XYPlane,
    CustomPlane,
    None
}

export enum ECollisionResponse {
    ECR_Ignore,
    ECR_Overlap,
    ECR_Block
}

export class FCollisionResponseContainer {
    public WorldStatic: ECollisionResponse = null
    public WorldDynamic: ECollisionResponse = null
    public Pawn: ECollisionResponse = null
    public Visibility: ECollisionResponse = null
    public Camera: ECollisionResponse = null
    public PhysicsBody: ECollisionResponse = null
    public Vehicle: ECollisionResponse = null
    public Destructible: ECollisionResponse = null
    public EngineTraceChannel1: ECollisionResponse = null
    public EngineTraceChannel2: ECollisionResponse = null
    public EngineTraceChannel3: ECollisionResponse = null
    public EngineTraceChannel4: ECollisionResponse = null
    public EngineTraceChannel5: ECollisionResponse = null
    public EngineTraceChannel6: ECollisionResponse = null
    public GameTraceChannel1: ECollisionResponse = null
    public GameTraceChannel2: ECollisionResponse = null
    public GameTraceChannel3: ECollisionResponse = null
    public GameTraceChannel4: ECollisionResponse = null
    public GameTraceChannel5: ECollisionResponse = null
    public GameTraceChannel6: ECollisionResponse = null
    public GameTraceChannel7: ECollisionResponse = null
    public GameTraceChannel8: ECollisionResponse = null
    public GameTraceChannel9: ECollisionResponse = null
    public GameTraceChannel10: ECollisionResponse = null
    public GameTraceChannel11: ECollisionResponse = null
    public GameTraceChannel12: ECollisionResponse = null
    public GameTraceChannel13: ECollisionResponse = null
    public GameTraceChannel14: ECollisionResponse = null
    public GameTraceChannel15: ECollisionResponse = null
    public GameTraceChannel16: ECollisionResponse = null
    public GameTraceChannel17: ECollisionResponse = null
    public GameTraceChannel18: ECollisionResponse = null
}

export class FResponseChannel {
    public Channel: FName
    public Response: ECollisionResponse
}


export enum EWalkableSlopeBehavior {
    WalkableSlope_Default,
    WalkableSlope_Increase,
    WalkableSlope_Decrease,
    WalkableSlope_Unwalkable
}

export class FWalkableSlopeOverride {
    public WalkableSlopeBehavior: EWalkableSlopeBehavior
    public WalkableSlopeAngle: number
}

export class FCollisionResponse {
    public ResponseToChannels: FCollisionResponseContainer = null
    public ResponseArray: FResponseChannel[] = null
}

export class FBodyInstance extends FBodyInstanceCore {
    public ObjectType: ECollisionChannel = null
    public CollisionEnabled: ECollisionEnabled = null
    public SleepFamily: ESleepFamily = null
    public DOFMode: EDOFMode = null
    public bUseCCD: boolean = null
    public bIgnoreAnalyticCollisions: boolean = null
    public bNotifyRigidBodyCollision: boolean = null
    public bLockTranslation: boolean = null
    public bLockRotation: boolean = null
    public bLockXTranslation: boolean = null
    public bLockYTranslation: boolean = null
    public bLockZTranslation: boolean = null
    public bLockXRotation: boolean = null
    public bLockYRotation: boolean = null
    public bLockZRotation: boolean = null
    public bOverrideMaxAngularVelocity: boolean = null
    public bOverrideMaxDepenetrationVelocity: boolean = null
    public bOverrideWalkableSlopeOnInstance: boolean = null
    public bInterpolateWhenSubStepping: boolean = null
    public CollisionProfileName: FName = null
    public PositionSolverIterationCount: number = null
    public VelocitySolverIterationCount: number = null
    public CollisionResponses: FCollisionResponse = null
    public MaxDepenetrationVelocity: number = null
    public MassInKgOverride: number = null
    public LinearDamping: number = null
    public AngularDamping: number = null
    public CustomDOFPlaneNormal: FVector = null
    public COMNudge: FVector = null
    public MassScale: number = null
    public InertiaTensorScale: FVector = null
    public WalkableSlopeOverride: FWalkableSlopeOverride = null
    public PhysMaterialOverride: FPackageIndex /*PhysicalMaterial*/ = null
    public MaxAngularVelocity: number = null
    public CustomSleepThresholdMultiplier: number = null
    public StabilizationThresholdMultiplier: number = null
    public PhysicsBlendWeight: number = null
}