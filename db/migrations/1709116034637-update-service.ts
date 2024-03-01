import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateService1709116034637 implements MigrationInterface {
    name = 'UpdateService1709116034637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Service" ADD "employeesSettings" jsonb DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "Service" ADD "type" character varying NOT NULL DEFAULT 'individual'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Service" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "Service" DROP COLUMN "employeesSettings"`);
    }

}
