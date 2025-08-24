"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const otp_generator_1 = require("otp-generator");
const generateOtp = () => {
    return (0, otp_generator_1.generate)(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
};
exports.generateOtp = generateOtp;
//# sourceMappingURL=otp-generator.js.map