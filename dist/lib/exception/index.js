"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchError = void 0;
const common_1 = require("@nestjs/common");
const catchError = (error) => {
    if (error?.response) {
        throw new common_1.HttpException(error?.response?.message, error?.response?.statusCode);
    }
    throw new common_1.InternalServerErrorException(error.message);
};
exports.catchError = catchError;
//# sourceMappingURL=index.js.map