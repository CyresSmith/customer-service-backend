import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdService1710586085266 implements MigrationInterface {
  name = 'UpdService1710586085266';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Service" ALTER COLUMN "avatar" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "Service" ALTER COLUMN "avatar" SET DEFAULT ''`
    );
    await queryRunner.query(`ALTER TABLE "Service" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "Service" ADD "price" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "Service" ALTER COLUMN "desc" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "Service" ALTER COLUMN "desc" SET DEFAULT ''`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Service" ALTER COLUMN "desc" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "Service" ALTER COLUMN "desc" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "Service" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "Service" ADD "price" numeric(10,2) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "Service" ALTER COLUMN "avatar" DROP DEFAULT`
    );
    await queryRunner.query(
      `ALTER TABLE "Service" ALTER COLUMN "avatar" DROP NOT NULL`
    );
  }
}
