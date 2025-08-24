import { JwtService } from '@nestjs/jwt';
export declare class TokenService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    generateAccessToken: (payload: object) => Promise<string>;
    generateRefreshToken: (payload: object) => Promise<string>;
    verifyAccessToken: (accessToken: string) => Promise<any>;
    verifyRefreshToken: (refreshToken: string) => Promise<any>;
}
