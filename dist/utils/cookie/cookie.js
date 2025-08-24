"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeToCookie = void 0;
const writeToCookie = (res, dataName, data) => {
    res.cookie(dataName, data, {
        secure: true,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};
exports.writeToCookie = writeToCookie;
//# sourceMappingURL=cookie.js.map