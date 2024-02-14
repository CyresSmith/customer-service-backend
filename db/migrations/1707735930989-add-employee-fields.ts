import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmployeeFields1707735930989 implements MigrationInterface {
    name = 'AddEmployeeFields1707735930989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employee" ADD "email" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "phone" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "firstName" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "lastName" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "birthday" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "gender" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "email"`);
    }

}
