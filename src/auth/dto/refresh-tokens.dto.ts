import { IsString } from "class-validator";
import { RefreshToken } from '../../schemas/refresh-token.schema';

export class RefreshTokenDto {
    @IsString()
    refreshToken!: string;
}