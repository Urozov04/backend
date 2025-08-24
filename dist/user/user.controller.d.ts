import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfirmOtpDto } from './dto/confirmOtp-dto';
import { SignInUserDto } from './dto/signin-dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signUp(createUserDto: CreateUserDto): Promise<object>;
    confirmOtp(confirmOtpDto: ConfirmOtpDto): Promise<object>;
    signIn(userSignInDto: SignInUserDto, res: Response): Promise<object>;
    getProfile(req: Request): Promise<any>;
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
    uploadProfileImage(file?: Express.Multer.File): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
    deleteImage(fileId: number): Promise<{
        statusCode: number;
        message: string;
        data: any;
    }>;
}
