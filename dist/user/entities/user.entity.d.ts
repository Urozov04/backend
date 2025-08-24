import { Role } from 'src/enum';
export declare class UserEntity {
    id: number;
    full_name: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
