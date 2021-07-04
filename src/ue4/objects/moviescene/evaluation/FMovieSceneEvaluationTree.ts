import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { TRange } from "../../core/math/TRange";
import { IStructType } from "../../../assets/objects/UScriptStruct";

/**
 * FEvaluationTreeEntryHandle
 */
export class FEvaluationTreeEntryHandle {
    /**
     * entryIndex
     * @type {number}
     * @public
     */
    public entryIndex: number

    /**
     * Creates an instance using UE4 Reader or number
     * @param {FArchive | number} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FArchive | number) {
        this.entryIndex = arg instanceof FArchive ? arg.readInt32() : arg
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.entryIndex)
    }
}

/**
 * FEntry
 * @implements {IStructType}
 */
class FEntry implements IStructType {
    /**
     * The index into Items of the first item
     * @type {number}
     * @public
     */
    public startIndex: number

    /**
     * The number of currently valid items
     * @type {number}
     * @public
     */
    public size: number

    /**
     * The total capacity of allowed items before reallocating
     * @type {number}
     * @public
     */
    public capacity: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {number} startIndex
     * @param {number} size
     * @param {number} capacity
     * @constructor
     * @public
     */
    constructor(startIndex: number, size: number, capacity: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any, z?: any) {
        if (x instanceof FArchive) {
            this.startIndex = x.readInt32()
            this.size = x.readInt32()
            this.capacity = x.readInt32()
        } else {
            this.startIndex = x
            this.size = y
            this.capacity = z
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.startIndex)
        Ar.writeInt32(this.size)
        Ar.writeInt32(this.capacity)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            startIndex: this.startIndex,
            size: this.size,
            capacity: this.capacity
        }
    }
}

/**
 * TEvaluationTreeEntryContainer
 */
export class TEvaluationTreeEntryContainer<T> {
    /**
     * entries
     * @type {Array<FEntry>}
     * @public
     */
    public entries: FEntry[]

    /**
     * items
     * @type {Array<any>}
     * @public
     */
    public items: T[]

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method to use
     * @example new TEvaluationTreeEntryContainer(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T[])

    /**
     * Creates an instance using values
     * @param {Array<FEntry>} entries Entries to use
     * @param {Array<any>} items Items to use
     * @constructor
     * @public
     */
    constructor(entries: FEntry[], items: T[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y: any) {
        if (x instanceof FArchive) {
            this.entries = x.readArray(() => new FEntry(x))
            this.items = y()
        } else {
            this.entries = x
            this.items = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @param {any} write Method to use
     * @example <TEvaluationTreeEntryContainer>.serialize(Ar, () => it.serialize(Ar))
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter, write: (it: T[]) => void) {
        Ar.writeTArray(this.entries, (it) => it.serialize(Ar))
        write(this.items)
    }
}

/**
 * FMovieSceneEvaluationTreeNodeHandle
 */
export class FMovieSceneEvaluationTreeNodeHandle {
    /**
     * childrenHandle
     * @type {FEvaluationTreeEntryHandle}
     * @public
     */
    public childrenHandle: FEvaluationTreeEntryHandle

    /**
     * index
     * @type {number}
     * @public
     */
    public index: number

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FEvaluationTreeEntryHandle} childrenHandle Children handle to use
     * @param {number} index Index to use
     * @constructor
     * @public
     */
    constructor(childrenHandle: FEvaluationTreeEntryHandle, index: number)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.childrenHandle = new FEvaluationTreeEntryHandle(x)
            this.index = x.readInt32()
        } else {
            this.childrenHandle = x
            this.index = y
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.childrenHandle.serialize(Ar)
        Ar.writeInt32(this.index)
    }
}

/**
 * FMovieSceneEvaluationTreeNode
 * @implements {IStructType}
 */
export class FMovieSceneEvaluationTreeNode implements IStructType {
    /**
     * range
     * @type {TRange<number>}
     * @public
     */
    public range: TRange<number>

    /**
     * parent
     * @type {FMovieSceneEvaluationTreeNodeHandle}
     * @public
     */
    public parent: FMovieSceneEvaluationTreeNodeHandle

    /**
     * childrenId
     * @type {FEvaluationTreeEntryHandle}
     * @public
     */
    public childrenId: FEvaluationTreeEntryHandle

    /**
     * dataId
     * @type {FEvaluationTreeEntryHandle}
     * @public
     */
    public dataId: FEvaluationTreeEntryHandle

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {TRange<number>} range Range to use
     * @param {FMovieSceneEvaluationTreeNodeHandle} parent Parent to use
     * @param {FEvaluationTreeEntryHandle} childrenId Children id to use
     * @param {FEvaluationTreeEntryHandle} dataId Data id to use
     */
    constructor(
        range: TRange<number>,
        parent: FMovieSceneEvaluationTreeNodeHandle,
        childrenId: FEvaluationTreeEntryHandle,
        dataId: FEvaluationTreeEntryHandle
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(...args) {
        if (args.length === 1) {
            const Ar = args[0] as FArchive
            this.range = new TRange(Ar, () => Ar.readInt32())
            this.parent = new FMovieSceneEvaluationTreeNodeHandle(Ar)
            this.childrenId = new FEvaluationTreeEntryHandle(Ar)
            this.dataId = new FEvaluationTreeEntryHandle(Ar)
        } else {
            this.range = args[0]
            this.parent = args[1]
            this.childrenId = args[2]
            this.dataId = args[3]
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.range.serialize(Ar, (it) => Ar.writeInt32(it))
        this.parent.serialize(Ar)
        this.childrenId.serialize(Ar)
        this.dataId.serialize(Ar)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            range: this.range.toJson(),
            parent: {
                index: this.parent.index,
                childrenHandle: {
                    entryIndex: this.parent.childrenHandle.entryIndex
                }
            },
            childrenId: {
                entryIndex: this.childrenId.entryIndex
            },
            dataId: {
                entryIndex: this.dataId.entryIndex
            }
        }

    }
}

/**
 * FMovieSceneEvaluationTree
 */
export class FMovieSceneEvaluationTree {
    /**
     * rootNode
     * @type {FMovieSceneEvaluationTreeNode}
     * @public
     */
    public rootNode: FMovieSceneEvaluationTreeNode

    /**
     * childNodes
     * @type {TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>}
     * @public
     */
    public childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using values
     * @param {FMovieSceneEvaluationTreeNode} rootNode Root node to use
     * @param {TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>} childNodes Child nodes to use
     */
    constructor(rootNode: FMovieSceneEvaluationTreeNode, childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>)

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.rootNode = new FMovieSceneEvaluationTreeNode(x)
            this.childNodes = new TEvaluationTreeEntryContainer(
                x,
                () => x.readArray(() => new FMovieSceneEvaluationTreeNode(x))
            )
        }
    }

    /**
     * Serializes this
     * @param {any[]} args Args to use (default: FArchiveWriter)
     * @returns {void}
     * @public
     */
    serialize(...args) {
        const Ar = args[0] as FArchiveWriter
        this.rootNode.serialize(Ar)
        this.childNodes.serialize(Ar, (items) =>
            Ar.writeTArray(items, (it) => it.serialize(Ar)))
    }
}

/**
 * TMovieSceneEvaluationTree
 * @extends {FMovieSceneEvaluationTree}
 */
export class TMovieSceneEvaluationTree<T> extends FMovieSceneEvaluationTree {
    /**
     * data
     * @type {TEvaluationTreeEntryContainer<any>}
     * @public
     */
    public data: TEvaluationTreeEntryContainer<T>

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @param {any} init Method to use
     * @example new TMovieSceneEvaluationTree(Ar, () => Ar.readFName())
     * @constructor
     * @public
     */
    constructor(Ar: FArchive, init: () => T[])

    /**
     * Creates an instance using values
     * @param {FMovieSceneEvaluationTreeNode} rootNode Root node to use
     * @param {TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>} childNodes Child nodes to use
     * @param {TEvaluationTreeEntryContainer<any>} data Data to use
     * @constructor
     * @public
     */
    constructor(
        rootNode: FMovieSceneEvaluationTreeNode,
        childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>,
        data: TEvaluationTreeEntryContainer<T>
    )

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(x: any, y: any, z?: any) {
        if (x instanceof FArchive) {
            super(x)
            this.data = new TEvaluationTreeEntryContainer(x, y)
        } else {
            super(x, y)
            this.data = z
        }
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @param {any} write Method to use
     * @returns {void}
     * @example <TMovieSceneEvaluationTree>.serialize(Ar, (it) => it.serialize(Ar))
     * @public
     */
    serialize(Ar: FArchiveWriter, write?: (it: T[]) => void) {
        super.serialize(Ar)
        if (write)
            this.data.serialize(Ar, write)
    }
}