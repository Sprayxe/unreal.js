import { FName } from "../uobject/FName";
import { FArchive } from "../../reader/FArchive";
import { UnrealArray } from "../../../util/UnrealArray";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { IStructType } from "../../assets/objects/UScriptStruct";

/**
 * FGameplayTagContainer
 * @implements {IStructType}
 * @implements {Iterable<FName>}
 */
export class FGameplayTagContainer implements Iterable<FName>, IStructType {
    /**
     * gameplayTags
     * @type {Array<FName>}
     * @public
     */
    public gameplayTags: FName[]

    /**
     * Creates an empty instance
     * @constructor
     * @public
     */
    constructor()

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive)

    /**
     * Creates an instance using a value
     * @param {Array<FName>} gameplayTags Gameplay tags to use
     * @constructor
     * @public
     */
    constructor(gameplayTags: FName[])

    /** DO NOT USE THIS CONSTRUCTOR, THIS IS FOR THE LIBRARY */
    constructor(arg?: any) {
        if (!arg) {
            this.gameplayTags = []
        } else if (arg instanceof FArchive) {
            this.gameplayTags = new UnrealArray(arg.readUInt32(), () => arg.readFName())
        } else {
            this.gameplayTags = arg
        }
    }

    /**
     * Gets value
     * @param {string} parent Parent
     * @returns {FName} Value
     * @public
     */
    getValue(parent: string) {
        return this.gameplayTags.find(it => it.text.toLowerCase().startsWith(parent.toLowerCase()))
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
        Ar.writeUInt32(this.gameplayTags.length)
        this.gameplayTags.forEach((it) => Ar.writeFName(it))
    }

    [Symbol.iterator](): IterableIterator<FName> {
        return this.gameplayTags[Symbol.iterator]()
    }

    /**
     * Turns this into json
     * @returns {any} Json
     * @public
     */
    toJson(): any {
        return this.gameplayTags.map(g => g.text)
    }
}
