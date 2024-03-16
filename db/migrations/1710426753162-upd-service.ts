import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdService1710426753162 implements MigrationInterface {
    name = 'UpdService1710426753162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "avatar" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "avatar" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "desc" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "desc" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "desc" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "desc" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "price" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "avatar" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Service" ALTER COLUMN "avatar" DROP NOT NULL`);
    }

}
