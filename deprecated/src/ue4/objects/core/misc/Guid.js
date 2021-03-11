const FArchive = require("../../../reader/FArchive");
const FByteArchive = require("../../../reader/FByteArchive");
const EGuidFormats = require("./typings/EGuidFormats");

let mainGuid = new FGuid();
let a = 0;
let b = 0;
let c = 0;
let d = 0;

class FGuid {
    get mainGuid() { return mainGuid };
    get a() { return a };
    get b() { return b };
    get c() { return c };
    get d() { return d };

    constructor(...params) {
        params.forEach((v, k) => {
            if (k === 0) {
                switch (typeof k) {
                    case "object":
                        a = v.readUInt32();
                        b = v.readUInt32();
                        c = v.readUInt32();
                        d = v.readUInt32();
                        break;
                    case "number":
                        a = v;
                        break;
                    case "string":
                        const ar = new FByteArchive()
                        break;
                };
            } else if (k === 1) {
                b = v;
            } else if (k === 2) {
                c = v;
            } else {
                d = v;
            };
        });

        this = {
            ...this,
            ...EGuidFormats
        };
    };
};

module.exports = FGuid;