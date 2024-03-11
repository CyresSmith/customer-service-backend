import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdService1710156218795 implements MigrationInterface {
    name = 'UpdService1710156218795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Service" ADD "capacity" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "Service" ADD "placeLimit" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Service" DROP COLUMN "placeLimit"`);
        await queryRunner.query(`ALTER TABLE "Service" DROP COLUMN "capacity"`);
    }

}
