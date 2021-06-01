import { FArchive } from "../../../reader/FArchive";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { TRange } from "../../core/math/TRange";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FEvaluationTreeEntryHandle {
    public entryIndex: number

    constructor(arg: FArchive | number) {
        this.entryIndex = arg instanceof FArchive ? arg.readInt32() : arg
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.entryIndex)
    }
}

class FEntry implements IStructType {
    /** The index into Items of the first item */
    public startIndex: number
    /** The number of currently valid items */
    public size: number
    /** The total capacity of allowed items before reallocating */
    public capacity: number

    constructor(Ar: FArchive)
    constructor(startIndex: number, size: number, capacity: number)
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

    serialize(Ar: FArchiveWriter) {
        Ar.writeInt32(this.startIndex)
        Ar.writeInt32(this.size)
        Ar.writeInt32(this.capacity)
    }

    toJson(): any {
        return {
            startIndex: this.startIndex,
            size: this.size,
            capacity: this.capacity
        }
    }
}

export class TEvaluationTreeEntryContainer<T> {
    public entries: FEntry[]
    public items: T[]

    constructor(Ar: FArchive, init: () => T[])
    constructor(entries: FEntry[], items: T[])
    constructor(x: any, y: any) {
        if (x instanceof FArchive) {
            this.entries = x.readArray(() => new FEntry(x))
            this.items = y()
        } else {
            this.entries = x
            this.items = y
        }
    }

    serialize(Ar: FArchiveWriter, write: (it: T[]) => void) {
        Ar.writeTArray(this.entries, (it) => it.serialize(Ar))
        write(this.items)
    }
}

export class FMovieSceneEvaluationTreeNodeHandle {
    public childrenHandle: FEvaluationTreeEntryHandle
    public index: number

    constructor(Ar: FArchive)
    constructor(childrenHandle: FEvaluationTreeEntryHandle, index: number)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.childrenHandle = new FEvaluationTreeEntryHandle(x)
            this.index = x.readInt32()
        } else {
            this.childrenHandle = x
            this.index = y
        }
    }

    serialize(Ar: FArchiveWriter) {
        this.childrenHandle.serialize(Ar)
        Ar.writeInt32(this.index)
    }
}

export class FMovieSceneEvaluationTreeNode implements IStructType {
    public range: TRange<number>
    public parent: FMovieSceneEvaluationTreeNodeHandle
    public childrenId: FEvaluationTreeEntryHandle
    public dataId: FEvaluationTreeEntryHandle

    constructor(Ar: FArchive)
    constructor(range: TRange<number>, parent: FMovieSceneEvaluationTreeNodeHandle, childrenId: FEvaluationTreeEntryHandle, dataId: FEvaluationTreeEntryHandle)
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

    serialize(Ar: FArchiveWriter) {
        this.range.serialize(Ar, (it) => Ar.writeInt32(it))
        this.parent.serialize(Ar)
        this.childrenId.serialize(Ar)
        this.dataId.serialize(Ar)
    }

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

export class FMovieSceneEvaluationTree {
    public rootNode: FMovieSceneEvaluationTreeNode
    public childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>

    constructor(Ar: FArchive)
    constructor(rootNode: FMovieSceneEvaluationTreeNode, childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>)
    constructor(x: any, y?: any) {
        if (x instanceof FArchive) {
            this.rootNode = new FMovieSceneEvaluationTreeNode(x)
            this.childNodes = new TEvaluationTreeEntryContainer(
                x,
                () => x.readArray(() => new FMovieSceneEvaluationTreeNode(x))
            )
        }
    }

    serialize(...args) {
        const Ar = args[0] as FArchiveWriter
        this.rootNode.serialize(Ar)
        this.childNodes.serialize(Ar, (items) =>
            Ar.writeTArray(items, (it) => it.serialize(Ar)))
    }
}

export class TMovieSceneEvaluationTree<T> extends FMovieSceneEvaluationTree {
    public data: TEvaluationTreeEntryContainer<T>

    constructor(Ar: FArchive, init: () => T[])
    constructor(
        rootNode: FMovieSceneEvaluationTreeNode,
        childNodes: TEvaluationTreeEntryContainer<FMovieSceneEvaluationTreeNode>,
        data: TEvaluationTreeEntryContainer<T>
    )
    constructor(x: any, y: any, z?: any) {
        if (x instanceof FArchive) {
            super(x)
            this.data = new TEvaluationTreeEntryContainer(x, y)
        } else {
            super(x, y)
            this.data = z
        }
    }

    serialize(Ar: FArchiveWriter, write?: (it: T[]) => void) {
        super.serialize(Ar)
        if (write)
            this.data.serialize(Ar, write)
    }
}