import Collection from "@discordjs/collection";
import { FArchiveWriter } from "../../writer/FArchiveWriter";
import { FArchive } from "../../reader/FArchive";

/**
 * FCustomFields
 */
export class FCustomFields {
    /**
     * Fields
     * @type {Collection<string, string>}
     * @public
     */
    public fields: Collection<string, string>

    /**
     * Creates an instance using an UE4 Reader
     * @param {FArchive} Ar UE4 Reader to use
     * @constructor
     * @public
     */
    constructor(Ar: FArchive) {
        const startPos = Ar.pos
        const dataSize = Ar.readUInt32()
        /*val dataVersionInt = */
        Ar.readUInt8()
        const elementCount = Ar.readInt32()
        const arrayFields = []
        for (let i = 0; i < elementCount; ++i)
            arrayFields[i] = mutablePair("", "")
        for (const field of arrayFields) field.first = Ar.readString()
        for (const field of arrayFields) field.second = Ar.readString()
        const fields = new Collection<string, string>()
        for (const { first, second } of arrayFields)
            fields[first] = second
        this.fields = fields
        Ar.pos = startPos + dataSize
    }

    /**
     * Serializes this
     * @param {FArchiveWriter} Ar UE4 Writer to use
     * @returns {void}
     * @public
     */
    serialize(Ar: FArchiveWriter) {
    }
}

function mutablePair<K, V>(first: K, second: V) {
    return { first, second }
}