import { Company, User } from 'db/entities';
import { ITokenPair } from 'src/token/token.types';

export interface IBasicUserInfo
  extends Pick<User, 'id' | 'email' | 'phone' | 'firstName' | 'lastName'> {}

export interface IBasicUserInfoWithTokens extends ITokenPair {
  user: IBasicUserInfo;
}

export interface IBasicUserInfoWithTokensAndCompanies
  extends IBasicUserInfoWithTokens {
  companies: Company[];
}
