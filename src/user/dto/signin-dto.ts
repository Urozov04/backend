import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInUserDto {
  @ApiProperty({ example: 'laylo@gmail.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'Laylo123!' })
  @IsString()
  password: string;
}
