import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateServiceDependency1711194887993 implements MigrationInterface {
    name = 'UpdateServiceDependency1711194887993'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_services_service" DROP CONSTRAINT "FK_a037140d8c4cfe519b515db0c59"`);
        await queryRunner.query(`ALTER TABLE "Service" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "Service" ADD "price" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employee_services_service" ADD CONSTRAINT "FK_a037140d8c4cfe519b515db0c59" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee_services_service" DROP CONSTRAINT "FK_a037140d8c4cfe519b515db0c59"`);
        await queryRunner.query(`ALTER TABLE "Service" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "Service" ADD "price" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "employee_services_service" ADD CONSTRAINT "FK_a037140d8c4cfe519b515db0c59" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

}
