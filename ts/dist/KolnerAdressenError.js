"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KolnerAdressenError = void 0;
class KolnerAdressenError extends Error {
    isKolnerAdressenError = true;
    sdk = 'KolnerAdressen';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.KolnerAdressenError = KolnerAdressenError;
//# sourceMappingURL=KolnerAdressenError.js.map