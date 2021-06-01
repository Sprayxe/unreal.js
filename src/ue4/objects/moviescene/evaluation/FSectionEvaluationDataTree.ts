// Note: this struct was removed in this commit:
// https://github.com/EpicGames/UnrealEngine/commit/76506dfcdc705f50a9bde3b4bd08bd6514d2cd4d#diff-6fef167d7afd2b5d1e22e25965e6c8d0717bb388e426ee26c8be670283984547
import { TMovieSceneEvaluationTree } from "./FMovieSceneEvaluationTree";
import { FStructFallback } from "../../../assets/objects/FStructFallback";
import { FAssetArchive } from "../../../assets/reader/FAssetArchive";
import { FName } from "../../uobject/FName";
import { FArchiveWriter } from "../../../writer/FArchiveWriter";
import { IStructType } from "../../../assets/objects/UScriptStruct";

export class FSectionEvaluationDataTree implements IStructType {
    public tree: TMovieSceneEvaluationTree<FStructFallback> /*TMovieSceneEvaluationTree<FSectionEvaluationData>*/

    constructor(arg: FAssetArchive | TMovieSceneEvaluationTree<FStructFallback>) {
        this.tree = arg instanceof FAssetArchive
            ? new TMovieSceneEvaluationTree(
                arg, () => arg.readArray(() => new FStructFallback(arg, FName.dummy("SectionEvaluationData"))))
            : arg
    }

    serialize(Ar: FArchiveWriter) {
        this.tree.serialize(Ar)
    }

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