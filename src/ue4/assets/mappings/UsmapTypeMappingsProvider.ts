import { TypeMappingsProvider } from "./TypeMappingsProvider";
import { FArchive } from "../../reader/FArchive";
import { FName } from "../../objects/uobject/FName";
import { ParserException } from "../../../exceptions/Exceptions";
import { Compression } from "../../../compression/Compression";
import { PropertyType } from "../objects/PropertyType";

export class UsmapTypeMappingsProvider extends TypeMappingsProvider {
    static FILE_MAGIC = 0x30C4

    private load: () => FArchive

    constructor(file: Buffer)
    constructor(load: () => FArchive)
    constructor(x: any) {
        super()
        this.load = x instanceof Buffer ? () => new FArchive(x) : x
    }

    reload(): boolean {
        const data = this.readCompressedUsmap(this.load())
        this.parseData(new FUsmapNameTableArchive(data))
        return true
    }

    protected readCompressedUsmap(Ar: FArchive): Buffer {
        const magic = Ar.readInt16()
        if (magic !== UsmapTypeMappingsProvider.FILE_MAGIC) {
            throw ParserException(".usmap file has an invalid magic constant")
        }

        const version = Ar.readUInt8()
        if (version !== EUsmapVersion.latest()) {
            throw ParserException(`.usmap file has invalid version ${version}`)
        }

        const methodInt = Ar.readUInt8()
        const compSize = Ar.readInt32()
        const decompSize = Ar.readInt32()
        if (Ar.size - Ar.pos < compSize) {
            throw ParserException("There is not enough data in the .usmap file")
        }

        const compData = Ar.readBuffer(compSize)
        const data = Ar.readBuffer(decompSize)

        const method = methodInt === 0 ? "None" : methodInt === 1 ? "Oodle" : methodInt === 2 ? "Brotli" : null
        if (!method)
            throw new Error(`Unknown compression method index ${methodInt}`)
        Compression.uncompress(method, data, 0, decompSize, compData, 0, compSize)

        return data
    }

    private deserializePropData(Ar: FUsmapNameTableArchive): PropertyType {
        return null
    }

    private parseData(Ar: FUsmapNameTableArchive) {

    }
}

class FUsmapNameTableArchive extends FArchive {
    public nameMap: string[]

    constructor(data: Buffer) {
        super(data)
    }

    readFName(): FName {
        const nameIndex = this.readInt32()
        if (nameIndex === -1) {
            return FName.NAME_None
        }
        if (!this.nameMap[nameIndex]) {
            throw ParserException("FName could not be read, requested index $nameIndex, name map size ${nameMap.size}")
        }
        return FName.dummy(this.nameMap[nameIndex])
    }
}

class EUsmapVersion {
    public Initial = 0
    static latest() {
        return Object.values(new EUsmapVersion()).pop()
    }
}