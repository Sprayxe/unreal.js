import { BankHeader } from "./objects/BankHeader";
import { AkFolder } from "./objects/AkFolder";
import { DataIndex } from "./objects/DataIndex";
import { Hierarchy } from "./objects/Hierarchy";
import Collection from "@discordjs/collection";
import { FArchive } from "../reader/FArchive";
import { ESectionIdentifier } from "./enums/ESectionIdentifier";
import { ParserException } from "../../exceptions/Exceptions";
import { AkEntry } from "./objects/AkEntry";

export class WwiseReader {
    public header: BankHeader
    public folders: AkFolder[]
    public initialization: string[]
    public wemIndexes: DataIndex[]
    public wemSounds: Buffer[]
    public hierarchy: Hierarchy[]
    public idToString: Collection<number, string>
    public platform: string
    public wwiseEncodedMedias: Collection<string, Buffer>

    constructor(Ar: FArchive) {
        this.idToString = new Collection<number, string>()
        this.wwiseEncodedMedias = new Collection<string, Buffer>()
        while (Ar.pos < Ar.size) {
            const sectionIdentifier = Ar.readUInt32()
            const sectionLength = Ar.readInt32()
            const position = Ar.pos
            switch (sectionIdentifier) {
                case ESectionIdentifier.AKPK:
                    if (!Ar.readBoolean())
                        throw new ParserException(`FArchive reader has unsupported endianness.`, Ar)
                    Ar.pos += 16
                    const _len1 = Ar.readInt32()
                    this.folders = new Array(_len1)
                    for (let i = 0; i < _len1; ++i) {
                        this.folders[i] = new AkFolder(Ar)
                    }
                    this.folders.forEach((folder) => folder.populateName(Ar))
                    for (const folder of this.folders) {
                        const len = Ar.readUInt32()
                        folder.entries = new Array(len)
                        for (let i = 0; i < len; ++i) {
                            const entry = new AkEntry(Ar)
                            entry.path = this.folders[entry.folderId].name
                            const savePos = Ar.pos
                            Ar.pos = entry.offset
                            entry.isSoundBank = Ar.readUInt32() === ESectionIdentifier.BKHD
                            Ar.pos -= 4
                            entry.data = Ar.read(entry.size)
                            Ar.pos = savePos
                            folder.entries[i] = entry
                        }
                    }
                    break
                case ESectionIdentifier.BKHD:
                    this.header = new BankHeader(Ar)
                    break
                case ESectionIdentifier.INIT:
                    const _len2 = Ar.readInt32()
                    this.initialization = new Array(_len2)
                    for (let i = 0; i < _len2; ++i) {
                        Ar.pos += 4
                        this.initialization[i] = Ar.readString()
                    }
                    break
                case ESectionIdentifier.DIDX:
                    const _len3 = sectionLength / 12
                    this.wemIndexes = new Array(_len3)
                    for (let i = 0; i < _len3; ++i) {
                        this.wemIndexes[i] = new DataIndex(Ar)
                    }
                    break
                case ESectionIdentifier.HIRC:
                    const _len4 = Ar.readInt32()
                    this.hierarchy = new Array(_len4)
                    for (let i = 0; i < _len4; ++i) {
                        this.hierarchy[i] = new Hierarchy(Ar)
                    }
                    break
                case ESectionIdentifier.RIFF:
                    // read byte[sectionLength] it's simply a wem file
                    break
                case ESectionIdentifier.STID:
                    Ar.pos += 4
                    const len = Ar.readInt32()
                    for (let i = 0; i < len; ++i) {
                        Ar.readUInt32()
                        Ar.readString()
                    }
                    break
                case ESectionIdentifier.STMG:
                    break
                case ESectionIdentifier.ENVS:
                    break
                case ESectionIdentifier.FXPR:
                    break
                case ESectionIdentifier.PLAT:
                    this.platform = Ar.readString()
                    break
                default:
                    console.warn(`Unknown section ${sectionIdentifier.toString(64)} at pos ${Ar.pos}`)
                    break
            }

            if (Ar.pos !== position + sectionLength) {
                const shouldBe = position + sectionLength
                console.warn(`Didn't read 0x${sectionIdentifier.toString(16)} correctly (at ${Ar.pos}, should be ${shouldBe})`)
                Ar.pos = shouldBe
            }
        }

        if (this.folders != null) {
            for (const folder of this.folders) {
                for (const entry of folder.entries) {
                    if (entry.isSoundBank || entry.data == null) continue
                    const id = this.idToString.get(entry.nameHash)
                    this.wwiseEncodedMedias.set(id ? id : `${entry.path.toUpperCase()}_${entry.nameHash}`, entry.data)
                }
            }
        }
    }

    toJson() {
        return {
            header: {
                id: this.header.id,
                version: this.header.version
            },
            folders: this.folders.map(f => f.toJson()),
            initialization: this.initialization,
            wemIndexes: this.wemIndexes.map(w => {
                return {
                    length: w.length,
                    offset: w.offset,
                    id: w.id
                }
            }),
            hierarchy: this.hierarchy.map(h => h.toJson()),
            idToString: this.idToString.map((v, k) => {
                return { key: k, value: v }
            }),
            platform: this.platform
        }
    }
}