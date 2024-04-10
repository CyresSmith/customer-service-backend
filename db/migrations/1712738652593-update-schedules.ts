import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchedules1712738652593 implements MigrationInterface {
    name = 'UpdateSchedules1712738652593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedule" DROP CONSTRAINT "FK_3832ec4f849dbc3cc03cc8f31ed"`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP CONSTRAINT "FK_c1ec0cb63387d4c8bb2892bc002"`);
        await queryRunner.query(`ALTER TABLE "Action" DROP CONSTRAINT "FK_a84cebf1fd79fa94e187eb23a56"`);
        await queryRunner.query(`ALTER TABLE "Schedule" ADD CONSTRAINT "FK_3832ec4f849dbc3cc03cc8f31ed" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD CONSTRAINT "FK_c1ec0cb63387d4c8bb2892bc002" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Action" ADD CONSTRAINT "FK_a84cebf1fd79fa94e187eb23a56" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Action" DROP CONSTRAINT "FK_a84cebf1fd79fa94e187eb23a56"`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP CONSTRAINT "FK_c1ec0cb63387d4c8bb2892bc002"`);
        await queryRunner.query(`ALTER TABLE "Schedule" DROP CONSTRAINT "FK_3832ec4f849dbc3cc03cc8f31ed"`);
        await queryRunner.query(`ALTER TABLE "Action" ADD CONSTRAINT "FK_a84cebf1fd79fa94e187eb23a56" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Employee" ADD CONSTRAINT "FK_c1ec0cb63387d4c8bb2892bc002" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Schedule" ADD CONSTRAINT "FK_3832ec4f849dbc3cc03cc8f31ed" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
