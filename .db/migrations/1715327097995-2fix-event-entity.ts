import { MigrationInterface, QueryRunner } from "typeorm";

export class 2fixEventEntity1715327097995 implements MigrationInterface {
    name = '2fixEventEntity1715327097995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "month" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "time" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "month"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "date" TIMESTAMP NOT NULL`);
    }

}
