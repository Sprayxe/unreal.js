import { FGuid } from "../core/misc/Guid";
import { FArchive } from "../../reader/FArchive";

export class FUniqueObjectGuid {
    guid: FGuid

    constructor(Ar: FArchive)
    constructor(guid: FGuid)
    constructor(x?: any) {
        if (x instanceof FArchive) {
            this.guid = new FGuid(x)
        } else {
            this.guid = x
        }
    }
}