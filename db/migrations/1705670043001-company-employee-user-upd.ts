import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyEmployeeUserUpd1705670043001 implements MigrationInterface {
    name = 'CompanyEmployeeUserUpd1705670043001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" RENAME COLUMN "phone" TO "phones"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "Employee" ALTER COLUMN "jobTitle" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employee" ALTER COLUMN "jobTitle" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "User" ADD "role" character varying NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`ALTER TABLE "Company" RENAME COLUMN "phones" TO "phone"`);
    }

}
