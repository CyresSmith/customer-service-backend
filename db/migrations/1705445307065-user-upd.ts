import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUpd1705445307065 implements MigrationInterface {
    name = 'UserUpd1705445307065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "accessToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "refreshToken" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "refreshToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "accessToken" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT`);
    }

}
