"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = require("../../config");
const exception_1 = require("../../lib/exception");
const uuid_1 = require("uuid");
let FileService = class FileService {
    baseUrl = config_1.default.BASE_URL;
    filePath = (0, path_1.resolve)(__dirname, '..', '..', '..', '..', 'uploads');
    async createFile(file) {
        try {
            const ext = (0, path_1.extname)(file.originalname);
            const fileName = `${file.originalname.split('.')[0]}_${(0, uuid_1.v4)()}${ext}`;
            if (!(0, fs_1.existsSync)(this.filePath)) {
                (0, fs_1.mkdirSync)(this.filePath, { recursive: true });
            }
            await new Promise((res, rej) => {
                (0, fs_1.writeFile)((0, path_1.join)(this.filePath, fileName), file.buffer, (e) => {
                    if (e)
                        rej(e);
                    res();
                });
            });
            return `${this.baseUrl}${fileName}`;
        }
        catch (e) {
            return (0, exception_1.catchError)(e);
        }
    }
    async deleteFile(fileName) {
        try {
            fileName = fileName.split(config_1.default.BASE_URL)[1];
            const file = (0, path_1.resolve)(this.filePath, fileName);
            if (!(0, fs_1.existsSync)(file)) {
                throw new common_1.BadRequestException(`File does not exist: ${fileName}`);
            }
            await new Promise((res, rej) => {
                (0, fs_1.unlink)(file, (err) => {
                    if (err)
                        rej(err);
                    res();
                });
            });
        }
        catch (e) {
            return (0, exception_1.catchError)(e);
        }
    }
    async existsFile(fileName) {
        try {
            if (!fileName) {
                return false;
            }
            fileName = fileName.split(config_1.default.BASE_URL)[1];
            const file = (0, path_1.resolve)(this.filePath, fileName);
            if ((0, fs_1.existsSync)(file)) {
                return true;
            }
            return false;
        }
        catch (e) {
            return (0, exception_1.catchError)(e);
        }
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)()
], FileService);
//# sourceMappingURL=file.service.js.map