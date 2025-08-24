"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let FileEntity = class FileEntity {
    id;
    path;
    createdAt;
};
exports.FileEntity = FileEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Unique ID of the image file',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FileEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'http://localhost:3000/uploads/example_1234.jpg',
        description: 'Public URL (path) to access the uploaded image',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'path' }),
    __metadata("design:type", String)
], FileEntity.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-08-23T14:55:00.000Z',
        description: 'Timestamp when the image was uploaded',
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], FileEntity.prototype, "createdAt", void 0);
exports.FileEntity = FileEntity = __decorate([
    (0, typeorm_1.Entity)('images')
], FileEntity);
//# sourceMappingURL=file.entity.js.map