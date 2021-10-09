import { UProperty } from "../../../../util/decorators/UProperty";
import { FVector } from "./FVector";
import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";

export class FBoxSphereBounds {
    @UProperty({name: "Origin"})
    public origin: FVector = null

    @UProperty({name: "BoxExtent"})
    public boxExtent: FVector = null

    @UProperty({name: "SphereRadius"})
    public sphereRadius: number = null

    public constructor(origin: FVector, boxExtent: FVector, sphereRadius: number)
    public constructor(Ar: FArchive)
    public constructor(...args) {
        const arg = args[0]
        if (arg instanceof FArchive) {
            this.origin = new FVector(arg)
            this.boxExtent = new FVector(arg)
            this.sphereRadius = arg.readFloat32()
        } else {
            this.origin = arg
            this.boxExtent = args[1]
            this.sphereRadius = args[2]
        }
    }

    public serialize(Ar: FArchiveWriter) {
        this.origin.serialize(Ar)
        this.boxExtent.serialize(Ar)
        Ar.writeFloat32(this.sphereRadius)
    }
}