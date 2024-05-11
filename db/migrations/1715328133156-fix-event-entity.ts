import { MigrationInterface, QueryRunner } from "typeorm";

export class FixEventEntity1715328133156 implements MigrationInterface {
    name = 'FixEventEntity1715328133156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_services" ("services" integer NOT NULL, "events" integer NOT NULL, CONSTRAINT "PK_686dec243386ad4a084f70bfe32" PRIMARY KEY ("services", "events"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ea5df86767113ded531ea05e4" ON "event_services" ("services") `);
        await queryRunner.query(`CREATE INDEX "IDX_58f2c989d2ce8a05016f973171" ON "event_services" ("events") `);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "month" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "day" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "event_services" ADD CONSTRAINT "FK_6ea5df86767113ded531ea05e4d" FOREIGN KEY ("services") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "event_services" ADD CONSTRAINT "FK_58f2c989d2ce8a05016f973171b" FOREIGN KEY ("events") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event_services" DROP CONSTRAINT "FK_58f2c989d2ce8a05016f973171b"`);
        await queryRunner.query(`ALTER TABLE "event_services" DROP CONSTRAINT "FK_6ea5df86767113ded531ea05e4d"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "day"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "month"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58f2c989d2ce8a05016f973171"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ea5df86767113ded531ea05e4"`);
        await queryRunner.query(`DROP TABLE "event_services"`);
    }

}
