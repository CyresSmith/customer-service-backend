import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateScheduleFields1708460669022 implements MigrationInterface {
    name = 'UpdateScheduleFields1708460669022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedule" DROP CONSTRAINT "FK_bd37610f04f78c77edf95077615"`);
        await queryRunner.query(`ALTER TABLE "Schedule" RENAME COLUMN "employeesId" TO "employeeId"`);
        await queryRunner.query(`ALTER TABLE "Schedule" ADD CONSTRAINT "FK_3832ec4f849dbc3cc03cc8f31ed" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedule" DROP CONSTRAINT "FK_3832ec4f849dbc3cc03cc8f31ed"`);
        await queryRunner.query(`ALTER TABLE "Schedule" RENAME COLUMN "employeeId" TO "employeesId"`);
        await queryRunner.query(`ALTER TABLE "Schedule" ADD CONSTRAINT "FK_bd37610f04f78c77edf95077615" FOREIGN KEY ("employeesId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
