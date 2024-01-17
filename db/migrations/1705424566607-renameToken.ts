import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameToken1705424566607 implements MigrationInterface {
    name = 'RenameToken1705424566607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "accessToken" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "refreshToken" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "refreshToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "accessToken"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "token" character varying NOT NULL`);
    }

}
