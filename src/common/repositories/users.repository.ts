import { Injectable } from '@nestjs/common';
import { User } from 'db/entities';
import { IBasicUserInfo } from 'src/users/users.types';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly ds: DataSource) {
    super(User, ds.createEntityManager());
  }

  // ============================================ Is exist check

  async isExistCheck(email: string, phone: string): Promise<number | null> {
    const existUser = await this.findOne({
      where: [{ email }, { phone }],
    });

    if (existUser && existUser.id) {
      return existUser.id;
    }

    return null;
  }

  // ============================================ Get user by id

  async getById(id: number): Promise<IBasicUserInfo> {
    const user = await this.findOne({
      where: {
        id,
      },
      select: ['id', 'email', 'phone', 'firstName', 'lastName'],
    });

    return { ...user };
  }

  // ============================================ Get user by accessToken

  async getByAccessToken(accessToken: string): Promise<IBasicUserInfo> {
    const user = await this.findOne({
      relations: ['employees', 'employees.company'],
      where: {
        accessToken,
      },
      select: ['id', 'email', 'phone', 'firstName', 'lastName', 'employees'],
    });

    return user;
  }

  // ============================================ Get user by refreshToken

  async getByRefreshToken(refreshToken: string): Promise<IBasicUserInfo> {
    const user = await this.findOne({
      where: {
        refreshToken,
      },
      select: ['id', 'email', 'phone', 'firstName', 'lastName'],
    });

    return { ...user };
  }
}
