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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const exception_1 = require("../lib/exception");
const success_1 = require("../lib/success");
const otp_generator_1 = require("../utils/otp-generator/otp-generator");
const mail_service_1 = require("../utils/mail/mail.service");
const cache_manager_1 = require("@nestjs/cache-manager");
const generateToken_1 = require("../utils/token/generateToken");
const cookie_1 = require("../utils/cookie/cookie");
const bcrypt = require("bcrypt");
const file_service_1 = require("../utils/file/file.service");
const file_entity_1 = require("./entities/file.entity");
let UserService = class UserService {
    userRepo;
    fileRepo;
    mailService;
    cacheManager;
    tokenService;
    fileService;
    constructor(userRepo, fileRepo, mailService, cacheManager, tokenService, fileService) {
        this.userRepo = userRepo;
        this.fileRepo = fileRepo;
        this.mailService = mailService;
        this.cacheManager = cacheManager;
        this.tokenService = tokenService;
        this.fileService = fileService;
    }
    async signUpUser(createUserDto) {
        try {
            const existsEmail = await this.userRepo.findOne({
                where: { email: createUserDto.email },
            });
            if (existsEmail) {
                throw new common_1.ConflictException(`User with email ${createUserDto.email} already exists`);
            }
            const hashed_pass = await bcrypt.hash(createUserDto.password, 10);
            const newUser = {
                ...createUserDto,
                password: hashed_pass,
            };
            this.userRepo.create(createUserDto);
            await this.userRepo.save(newUser);
            const otp = (0, otp_generator_1.generateOtp)();
            await this.mailService.sendOtp(createUserDto.email, 'Welcome to online marketplace', otp);
            await this.cacheManager.set(createUserDto.email, otp, 120000);
            return (0, success_1.successRes)({}, 200, `Otp sent to the email ${createUserDto.email}`);
        }
        catch (error) {
            return (0, exception_1.catchError)(error);
        }
    }
    async confirmOtp(confirmOtpDto) {
        try {
            const { email, otp } = confirmOtpDto;
            const user = await this.userRepo.findOne({ where: { email } });
            if (!user)
                throw new common_1.BadRequestException(`User with email ${email} does not exist`);
            const hasUser = await this.cacheManager.get(email);
            if (!hasUser || hasUser !== otp)
                throw new common_1.BadRequestException(`Incorrect or expired otp`);
            return (0, success_1.successRes)(`Otp confirmed successfully`);
        }
        catch (e) {
            return (0, exception_1.catchError)(e);
        }
    }
    async signIn(userSignInDto, res) {
        try {
            const { email, password } = userSignInDto;
            const user = await this.userRepo.findOne({ where: { email } });
            if (!user) {
                throw new common_1.BadRequestException('Email or password incorrect');
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                throw new common_1.BadRequestException('Email or password incorrect');
            }
            const { id, role } = user;
            const payload = { id, role };
            const accessToken = await this.tokenService.generateAccessToken(payload);
            const refreshToken = await this.tokenService.generateRefreshToken(payload);
            (0, cookie_1.writeToCookie)(res, 'refreshTokenUser', refreshToken);
            return (0, success_1.successRes)(accessToken);
        }
        catch (error) {
            return (0, exception_1.catchError)(error);
        }
    }
    async authUserProfile(req) {
        try {
            if (req.user && 'id' in req.user) {
                const id = req.user.id;
                const user = await this.userRepo.findOne({ where: { id } });
                if (!user) {
                    throw new common_1.NotFoundException(`User not found`);
                }
                const authUser = {
                    full_name: user.full_name,
                    email: user.email,
                };
                return (0, success_1.successRes)(authUser);
            }
        }
        catch (error) {
            return (0, exception_1.catchError)(error);
        }
    }
    async updateUser(id, updateUserDto) {
        try {
            const existsUser = await this.userRepo.findOne({ where: { id } });
            if (!existsUser) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            const { affected } = await this.userRepo.update(id, updateUserDto);
            if (!affected) {
                throw new common_1.BadRequestException(`User with ID ${id} not updated`);
            }
            const updatedUser = await this.userRepo.findOne({ where: { id } });
            return (0, success_1.successRes)(updatedUser);
        }
        catch (error) {
            return (0, exception_1.catchError)(error);
        }
    }
    async deleteUser(id) {
        try {
            const existsUser = await this.userRepo.findOne({ where: { id } });
            if (!existsUser) {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            await this.userRepo.delete(id);
            return (0, success_1.successRes)();
        }
        catch (error) {
            return (0, exception_1.catchError)(error);
        }
    }
    async uploadImage(file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('No file uploaded');
            }
            const uploadedPath = await this.fileService.createFile(file);
            if (!uploadedPath) {
                throw new common_1.InternalServerErrorException('File upload failed');
            }
            const fileEntity = this.fileRepo.create({ path: uploadedPath });
            const savedFile = await this.fileRepo.save(fileEntity);
            return (0, success_1.successRes)(savedFile, 200, 'File uploaded and saved successfully');
        }
        catch (error) {
            return (0, exception_1.catchError)(error);
        }
    }
    async deleteImageById(fileId) {
        try {
            const file = await this.fileRepo.findOne({ where: { id: fileId } });
            if (!file)
                throw new common_1.NotFoundException('File not found');
            await this.fileService.deleteFile(file.path);
            await this.fileRepo.delete(fileId);
            return (0, success_1.successRes)({}, 200, 'Image deleted successfully');
        }
        catch (error) {
            return (0, exception_1.catchError)(error);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(file_entity_1.FileEntity)),
    __param(3, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService, Object, generateToken_1.TokenService,
        file_service_1.FileService])
], UserService);
//# sourceMappingURL=user.service.js.map