import { MigrationInterface, QueryRunner } from "typeorm";

export class ScheduleUpdate1707817749360 implements MigrationInterface {
    name = 'ScheduleUpdate1707817749360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedule" RENAME COLUMN "dates" TO "schedule"`);
        await queryRunner.query(`ALTER TABLE "Schedule" ALTER COLUMN "schedule" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Schedule" ALTER COLUMN "schedule" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Schedule" RENAME COLUMN "schedule" TO "dates"`);
    }

}
