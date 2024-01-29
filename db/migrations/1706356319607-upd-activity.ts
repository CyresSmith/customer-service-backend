import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdActivity1706356319607 implements MigrationInterface {
    name = 'UpdActivity1706356319607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Company" DROP CONSTRAINT "FK_bf349ebb31aa86631e4ff2fead8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bf349ebb31aa86631e4ff2fead"`);
        await queryRunner.query(`ALTER TABLE "Company" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "Activity" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Activity" ADD "categoryId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_ab098499bfe831fffa672f1a65" ON "Activity" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "Activity" ADD CONSTRAINT "FK_ab098499bfe831fffa672f1a650" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Activity" DROP CONSTRAINT "FK_ab098499bfe831fffa672f1a650"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab098499bfe831fffa672f1a65"`);
        await queryRunner.query(`ALTER TABLE "Activity" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "Activity" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "Company" ADD "categoryId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_bf349ebb31aa86631e4ff2fead" ON "Company" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "Company" ADD CONSTRAINT "FK_bf349ebb31aa86631e4ff2fead8" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
