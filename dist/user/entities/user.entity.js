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
exports.UserEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const enum_1 = require("../../enum");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
    id;
    full_name;
    email;
    password;
    role;
    createdAt;
    updatedAt;
};
exports.UserEntity = UserEntity;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Auto-generated unique user ID',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'John Doe',
        description: 'Full name of the user',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'full_name' }),
    __metadata("design:type", String)
], UserEntity.prototype, "full_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'johndoe@example.com',
        description: 'Email address of the user',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'email', unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'PasswordHere',
        description: 'Password of the user',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', name: 'password' }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-08-15T12:34:56.789Z',
        description: 'User creation timestamp',
    }),
    (0, typeorm_1.Column)({
        type: 'enum',
        name: 'role',
        enum: enum_1.Role,
        default: enum_1.Role.USER,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-08-15T14:00:00.000Z',
        description: 'User create timestamp',
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-08-15T14:00:00.000Z',
        description: 'User last update timestamp',
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('user')
], UserEntity);
//# sourceMappingURL=user.entity.js.map