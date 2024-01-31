import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserAndEmployeeAvatar1706717199886 implements MigrationInterface {
    name = 'AddUserAndEmployeeAvatar1706717199886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "User" ADD "avatar" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "avatar" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "avatar"`);
    }

}
