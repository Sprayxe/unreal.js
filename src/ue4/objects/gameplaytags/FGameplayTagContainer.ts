import { FName } from "../uobject/FName";
import { FArchive } from "../../reader/FArchive";
import { UnrealArray } from "../../../util/UnrealArray";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";

export class FGameplayTagContainer implements Iterable<FName>, IStructType {
    public gameplayTags: FName[]

    constructor()
    constructor(Ar: FArchive)
    constructor(gameplayTags: FName[])
    constructor(arg?: any) {
        if (!arg) {
            this.gameplayTags = []
        } else if (arg instanceof FArchive) {
            this.gameplayTags = new UnrealArray(arg.readUInt32(), () => arg.readFName())
        } else {
            this.gameplayTags = arg
        }
    }

    getValue(parent: string) {
        return this.gameplayTags.find(it => it.text.toLowerCase().startsWith(parent.toLowerCase()))
    }

    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.gameplayTags.length)
        this.gameplayTags.forEach((it) => Ar.writeFName(it))
    }

    [Symbol.iterator](): IterableIterator<FName> {
        return this.gameplayTags[Symbol.iterator]()
    }

    toJson(): any {
        return this.gameplayTags.map(g => g.text)
    }
}
