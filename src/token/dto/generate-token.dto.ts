import { IsEnum, IsNotEmpty } from 'class-validator';
import { TokenPayloadDto } from './token-payload.dto';

export enum TokenType {
    ACCESS = 1,
    REFRESH = 2,
}

export class GenerateTokenDto {
    @IsEnum(TokenType)
    type: TokenType;

    @IsNotEmpty({ message: 'User data is required' })
    payload: TokenPayloadDto;
}
