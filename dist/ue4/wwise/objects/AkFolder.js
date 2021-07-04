"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AkFolder = void 0;
class AkFolder {
    constructor(Ar) {
        this.offset = Ar.readUInt32();
        this.id = Ar.readUInt32();
    }
    populateName(Ar) {
        let str = "";
        while (true) {
            try {
                const c = Ar.readString();
                if (c === "")
                    break;
                str += c;
            }
            catch {
                break;
            }
        }
        this.name = str;
    }
    toJson() {
        return {
            offset: this.offset,
            id: this.id,
            name: this.name,
            entries: this.entries.map(e => e.toJson())
        };
    }
}
exports.AkFolder = AkFolder;
