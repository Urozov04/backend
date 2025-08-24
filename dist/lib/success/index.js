"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successRes = void 0;
const successRes = (data = {}, statusCode = 200, message = 'success') => {
    return {
        statusCode,
        message,
        data,
    };
};
exports.successRes = successRes;
//# sourceMappingURL=index.js.map