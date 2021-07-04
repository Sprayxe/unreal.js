"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WwiseReader = void 0;
const BankHeader_1 = require("./objects/BankHeader");
const AkFolder_1 = require("./objects/AkFolder");
const DataIndex_1 = require("./objects/DataIndex");
const Hierarchy_1 = require("./objects/Hierarchy");
const collection_1 = __importDefault(require("@discordjs/collection"));
const ESectionIdentifier_1 = require("./enums/ESectionIdentifier");
const Exceptions_1 = require("../../exceptions/Exceptions");
const UnrealArray_1 = require("../../util/UnrealArray");
const AkEntry_1 = require("./objects/AkEntry");
class WwiseReader {
    constructor(Ar) {
        this.idToString = new collection_1.default();
        this.wwiseEncodedMedias = new collection_1.default();
        while (Ar.pos < Ar.size) {
            const sectionIdentifier = Ar.readUInt32();
            const sectionLength = Ar.readInt32();
            const position = Ar.pos;
            switch (sectionIdentifier) {
                case ESectionIdentifier_1.ESectionIdentifier.AKPK:
                    if (!Ar.readBoolean())
                        throw new Exceptions_1.ParserException(`FArchive reader has unsupported endianness.`, Ar);
                    Ar.pos += 16;
                    this.folders = Ar.readArray(() => new AkFolder_1.AkFolder(Ar));
                    this.folders.forEach((folder) => folder.populateName(Ar));
                    for (const folder of this.folders) {
                        folder.entries = new UnrealArray_1.UnrealArray(Ar.readUInt32(), () => {
                            const entry = new AkEntry_1.AkEntry(Ar);
                            entry.path = this.folders[entry.folderId].name;
                            const savePos = Ar.pos;
                            Ar.pos = entry.offset;
                            entry.isSoundBank = Ar.readUInt32() === ESectionIdentifier_1.ESectionIdentifier.BKHD;
                            Ar.pos -= 4;
                            entry.data = Ar.readBuffer(entry.size);
                            Ar.pos = savePos;
                            return entry;
                        });
                    }
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.BKHD:
                    this.header = new BankHeader_1.BankHeader(Ar);
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.INIT:
                    this.initialization = Ar.readArray(() => {
                        Ar.pos += 4;
                        return Ar.readString();
                    });
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.DIDX:
                    this.wemIndexes = Ar.readArray(() => new DataIndex_1.DataIndex(Ar), sectionLength / 12);
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.HIRC:
                    this.hierarchy = Ar.readArray(() => new Hierarchy_1.Hierarchy(Ar));
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.RIFF:
                    // read byte[sectionLength] it's simply a wem file
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.STID:
                    Ar.pos += 4;
                    Ar.readTMap(null, () => {
                        return {
                            key: Ar.readUInt32(),
                            value: Ar.readString()
                        };
                    });
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.STMG:
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.ENVS:
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.FXPR:
                    break;
                case ESectionIdentifier_1.ESectionIdentifier.PLAT:
                    this.platform = Ar.readString();
                    break;
                default:
                    console.warn(`Unknown section ${sectionIdentifier.toString(64)} at pos ${Ar.pos}`);
                    break;
            }
            if (Ar.pos !== position + sectionLength) {
                const shouldBe = position + sectionLength;
                console.warn(`Didn't read 0x${sectionIdentifier.toString(16)} correctly (at ${Ar.pos}, should be ${shouldBe})`);
                Ar.pos = shouldBe;
            }
        }
        if (this.folders != null) {
            for (const folder of this.folders) {
                for (const entry of folder.entries) {
                    if (entry.isSoundBank || entry.data == null)
                        continue;
                    const id = this.idToString.get(entry.nameHash);
                    this.wwiseEncodedMedias.set(id ? id : `${entry.path.toUpperCase()}_${entry.nameHash}`, entry.data);
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
                };
            }),
            hierarchy: this.hierarchy.map(h => h.toJson()),
            idToString: this.idToString.map((v, k) => {
                return { key: k, value: v };
            }),
            platform: this.platform
        };
    }
}
exports.WwiseReader = WwiseReader;
