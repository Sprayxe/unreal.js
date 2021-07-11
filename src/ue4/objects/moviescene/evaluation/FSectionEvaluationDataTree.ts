import { TMovieSceneEvaluationTree } from "./FMovieSceneEvaluationTree";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FName } from "../../uobject/FName";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

// Note: this struct was removed in this commit:
// https://github.com/EpicGames/UnrealEngine/commit/76506dfcdc705f50a9bde3b4bd08bd6514d2cd4d#diff-6fef167d7afd2b5d1e22e25965e6c8d0717bb388e426ee26c8be670283984547

/**
 * FSectionEvaluationDataTree
 * @implements {IStructType}
 */
export class FSectionEvaluationDataTree implements IStructType {
    /**
     * tree
     * @type {TMovieSceneEvaluationTree<FStructFallback>}
     * @public
     */
    public tree: TMovieSceneEvaluationTree<FStructFallback> /*TMovieSceneEvaluationTree<FSectionEvaluationData>*/

    /**
     * Creates an instance using UE4 Asset Reader or TMovieSceneEvaluationTree<FStructFallback>
     * @param {FAssetArchive | TMovieSceneEvaluationTree<FStructFallback>} arg Value to use
     * @constructor
     * @public
     */
    constructor(arg: FAssetArchive | TMovieSceneEvaluationTree<FStructFallback>) {
        this.tree = arg instanceof FAssetArchive
            ? new TMovieSceneEvaluationTree(
                arg, () => {
                    const len = arg.readInt32()
                    const arr = new Array(len)
                    for (let i = 0; i < len; ++i) {
                        arr[i] = new FStructFallback(arg, FName.dummy("SectionEvaluationData"))
                    }
                    return arr
                })
            : arg
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        this.tree.serialize(Ar)
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return {
            tree: {
                data: {
                    items: this.tree.data.items.map(i => i.toJson()),
                    entries: this.tree.data.entries.map(e => e.toJson())
                },
                childNodes: {
                    items: this.tree.data.items.map(i => i.toJson()),
                    entries: this.tree.data.entries.map(e => e.toJson())
                },
                rootNode: this.tree.rootNode.toJson()
            }
        }
    }
}