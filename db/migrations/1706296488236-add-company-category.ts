import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyCategory1706296488236 implements MigrationInterface {
    name = 'AddCompanyCategory1706296488236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_services_service" DROP CONSTRAINT "FK_a037140d8c4cfe519b515db0c59"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "categoryId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_bf349ebb31aa86631e4ff2fead" ON "Company" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "Company" ADD CONSTRAINT "FK_bf349ebb31aa86631e4ff2fead8" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee_services_service" ADD CONSTRAINT "FK_a037140d8c4cfe519b515db0c59" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_services_service" DROP CONSTRAINT "FK_a037140d8c4cfe519b515db0c59"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP CONSTRAINT "FK_bf349ebb31aa86631e4ff2fead8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf349ebb31aa86631e4ff2fead"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "employee_services_service" ADD CONSTRAINT "FK_a037140d8c4cfe519b515db0c59" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
