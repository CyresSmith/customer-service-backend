import { User } from 'db/entities';
import { ITokenPair } from 'src/token/token.types';

export interface IBasicUserInfo
  extends Pick<User, 'id' | 'email' | 'phone' | 'firstName' | 'lastName'> {}

export interface IBasicUserInfoWithTokens extends IBasicUserInfo, ITokenPair {}
