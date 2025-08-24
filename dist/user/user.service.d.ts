import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { MailService } from 'src/utils/mail/mail.service';
import { Cache } from 'cache-manager';
import { SignInUserDto } from './dto/signin-dto';
import { TokenService } from 'src/utils/token/generateToken';
import { ConfirmOtpDto } from './dto/confirmOtp-dto';
import { Request, Response } from 'express';
import { Role } from 'src/enum';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileService } from 'src/utils/file/file.service';
import { FileEntity } from './entities/file.entity';
export interface Payload {
    id: number;
    role: Role;
}
export declare class UserService {
    private readonly userRepo;
    private readonly fileRepo;
    private readonly mailService;
    private readonly cacheManager;
    private readonly tokenService;
    private fileService;
    constructor(userRepo: Repository<UserEntity>, fileRepo: Repository<FileEntity>, mailService: MailService, cacheManager: Cache, tokenService: TokenService, fileService: FileService);
    signUpUser(createUserDto: CreateUserDto): Promise<object>;
    confirmOtp(confirmOtpDto: ConfirmOtpDto): Promise<object>;
    signIn(userSignInDto: SignInUserDto, res: Response): Promise<object>;
    authUserProfile(req: Request): Promise<any>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    deleteUser(id: number): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    uploadImage(file?: Express.Multer.File): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    deleteImageById(fileId: number): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
}
