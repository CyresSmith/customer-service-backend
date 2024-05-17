import { Company, User } from 'db/entities';
import { ITokenPair } from 'src/token/token.types';

export interface IBasicUserInfo
    extends Pick<User, 'id' | 'email' | 'phone' | 'firstName' | 'lastName' | 'verify' | 'avatar'> {}

export interface IUserData extends Omit<IBasicUserInfo, 'verify'> {}

export interface IBasicUserInfoWithTokens extends ITokenPair {
    user: IBasicUserInfo;
}

export interface IBasicUserInfoWithTokensAndCompanies extends IBasicUserInfoWithTokens {
    companies: Pick<Company, 'id' | 'name' | 'avatar'>[];
}
