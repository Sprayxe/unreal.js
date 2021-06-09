import { UObject } from "./UObject";
import { USCS_Node } from "./USCS_Node";

export class USimpleConstructionScript extends UObject {
    public RootNodes: USCS_Node[] = null
    public AllNodes: USCS_Node[] = null
    public DefaultSceneRootNode: USCS_Node = null
}