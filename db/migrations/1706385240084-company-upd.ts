import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyUpd1706385240084 implements MigrationInterface {
    name = 'CompanyUpd1706385240084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "desc" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "desc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" SET NOT NULL`);
    }

}
