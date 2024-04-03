import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBirthdays1712131880164 implements MigrationInterface {
    name = 'UpdateBirthdays1712131880164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "birthday" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "birthday" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "Client" ADD "birthday" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "birthday"`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD "birthday" character varying DEFAULT ''`);
    }

}
