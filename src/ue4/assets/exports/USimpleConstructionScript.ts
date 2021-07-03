import { UObject } from "./UObject";
import { USCS_Node } from "./USCS_Node";

/**
 * USimpleConstructionScript
 * @extends {UObject}
 */
export class USimpleConstructionScript extends UObject {
    /**
     * Root nodes
     * @type {Array<USCS_Node>}
     * @public
     */
    public RootNodes: USCS_Node[] = null

    /**
     * All nodes
     * @type {Array<USCS_Node>}
     * @public
     */
    public AllNodes: USCS_Node[] = null

    /**
     * Default scene root node
     * @type {USCS_Node}
     * @public
     */
    public DefaultSceneRootNode: USCS_Node = null
}