import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    name!: string;

    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Password must be at least 6 characters long and contain at least one letter and one number',
    })
    password!: string;
}