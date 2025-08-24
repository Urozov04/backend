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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const confirmOtp_dto_1 = require("./dto/confirmOtp-dto");
const signin_dto_1 = require("./dto/signin-dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const cache_manager_1 = require("@nestjs/cache-manager");
const authGuard_1 = require("../guard/authGuard");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async signUp(createUserDto) {
        return this.userService.signUpUser(createUserDto);
    }
    async confirmOtp(confirmOtpDto) {
        return this.userService.confirmOtp(confirmOtpDto);
    }
    async signIn(userSignInDto, res) {
        return this.userService.signIn(userSignInDto, res);
    }
    async getProfile(req) {
        return this.userService.authUserProfile(req);
    }
    async updateUser(id, updateUserDto) {
        return this.userService.updateUser(id, updateUserDto);
    }
    async deleteUser(id) {
        return this.userService.deleteUser(id);
    }
    async uploadProfileImage(file) {
        return this.userService.uploadImage(file);
    }
    async deleteImage(fileId) {
        return this.userService.deleteImageById(fileId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiOperation)({ summary: 'Register new user and send OTP' }),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OTP sent to email',
        schema: {
            example: {
                statusCode: 200,
                message: 'OTP sent to your email successfully',
                data: null,
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('confirm-otp'),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm user OTP' }),
    (0, swagger_1.ApiBody)({ type: confirmOtp_dto_1.ConfirmOtpDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OTP confirmed successfully',
        schema: {
            example: {
                statusCode: 200,
                message: 'OTP confirmed successfully',
                data: {
                    accessToken: 'JWT_TOKEN',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid OTP',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirmOtp_dto_1.ConfirmOtpDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "confirmOtp", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in user and set refresh token cookie' }),
    (0, swagger_1.ApiBody)({ type: signin_dto_1.SignInUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Access token returned',
        schema: {
            example: {
                statusCode: 200,
                message: 'Signed in successfully',
                data: {
                    accessToken: 'JWT_TOKEN',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SignInUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
__decorate([
    (0, common_1.UseGuards)(authGuard_1.AuthGuard),
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get authenticated user profile' }),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User profile returned',
        schema: {
            example: {
                statusCode: 200,
                message: 'User profile fetched successfully',
                data: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    createdAt: '2025-08-23T14:00:00.000Z',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'ID of the user to update',
    }),
    (0, swagger_1.ApiBody)({ type: update_user_dto_1.UpdateUserDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User updated successfully',
        schema: {
            example: {
                statusCode: 200,
                message: 'User updated successfully',
                data: {
                    id: 1,
                    name: 'Updated Name',
                    email: 'updated@example.com',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User not found',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'ID of the user to delete',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User deleted successfully',
        schema: {
            example: {
                statusCode: 200,
                message: 'User deleted successfully',
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'User not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'User with ID 1 not found',
                error: 'Not Found',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('upload-profile-image'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload one profile image' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiBody)({
        description: 'Upload one profile image',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'File uploaded successfully',
        schema: {
            example: {
                statusCode: 200,
                message: 'File uploaded successfully',
                data: {
                    file: {
                        id: 1,
                        path: 'http://localhost:3000/uploads/image_12345.jpg',
                        createdAt: '2025-08-23T14:55:00.000Z',
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file format' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadProfileImage", null);
__decorate([
    (0, common_1.Delete)('delete-image/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete image by file ID' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: Number,
        description: 'ID of the file to delete',
        required: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Image deleted successfully',
        schema: {
            example: {
                statusCode: 200,
                message: 'Image deleted successfully',
                data: null,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'File not found',
        schema: {
            example: {
                statusCode: 404,
                message: 'File with ID 1 not found',
                error: 'Not Found',
            },
        },
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteImage", null);
exports.UserController = UserController = __decorate([
    (0, common_1.UseInterceptors)(cache_manager_1.CacheInterceptor),
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map