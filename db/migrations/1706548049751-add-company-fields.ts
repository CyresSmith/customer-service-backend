import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyFields1706548049751 implements MigrationInterface {
    name = 'AddCompanyFields1706548049751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" ADD "employeesCount" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "branches" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" SET DEFAULT '{"monday":{"from":0,"to":0},"tuesday":{"from":0,"to":0},"wednesday":{"from":0,"to":0},"thursday":{"from":0,"to":0},"friday":{"from":0,"to":0},"saturday":{"from":0,"to":0},"sunday":{"from":0,"to":0}}'`);
        await queryRunner.query(`ALTER TABLE "Company" ADD CONSTRAINT "FK_bf349ebb31aa86631e4ff2fead8" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" DROP CONSTRAINT "FK_bf349ebb31aa86631e4ff2fead8"`);
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "branches"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "employeesCount"`);
    }

}
