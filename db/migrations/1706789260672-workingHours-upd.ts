import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkingHoursUpd1706789260672 implements MigrationInterface {
    name = 'WorkingHoursUpd1706789260672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" SET DEFAULT '{"friday": {"to": 0, "from": 0}, "monday": {"to": 0, "from": 0}, "sunday": {"to": 0, "from": 0}, "tuesday": {"to": 0, "from": 0}, "saturday": {"to": 0, "from": 0}, "thursday": {"to": 0, "from": 0}, "wednesday": {"to": 0, "from": 0}}'`);
        await queryRunner.query(`ALTER TABLE "Company" ALTER COLUMN "workingHours" SET NOT NULL`);
    }

}
