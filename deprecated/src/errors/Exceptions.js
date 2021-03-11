require("colors");

class AesError {
    constructor(message) {
        this.m = `[UnrealJS - AESError] ${message}`.red;
    };
};

class UtocError {
    constructor(message) {
        this.m = `[UnrealJS - IOError] ${message}`.red;
    };
};

class ParserError {
    constructor(message) {
        this.m = `[UnrealJS - ParserError] ${message}`.red;
    };
};

module.exports.AesError = AesError;
module.exports.UtocError = UtocError;
module.exports.ParserError = ParserError;