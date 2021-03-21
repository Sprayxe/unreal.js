import { FAssetArchive } from "./FAssetArchive";
import { UObject } from "../exports/UObject";
import { PayloadType } from "../util/PayloadType";
import { ParserException } from "../../../exceptions/Exceptions";
import { GExportArchiveCheckDummyName } from "../../../Globals";

export class FExportArchive extends FAssetArchive {
    data: Buffer
    obj: UObject
    pkg: any // TODO IoPackage

    constructor(data: Buffer, obj: UObject, pkg: any) {
        super(data, pkg.provider, pkg.fileName)
        this.data = data
        this.obj = obj
        this.pkg = pkg

        this.game = pkg.game.game
        this.ver = pkg.game.version
        this.owner = pkg
    }

    /*getPayload(type: PayloadType) {
        if (!this.provider)
            throw ParserException("Lazy loading a $type requires a file provider")

    }*/

    checkDummyName(dummyName: string) {
        if (GExportArchiveCheckDummyName && !(dummyName in this.pkg.nameMap.nameEntries)) {
            console.warn(`${dummyName} is not in the package name map. There must be something wrong.`)
        }
    }
}