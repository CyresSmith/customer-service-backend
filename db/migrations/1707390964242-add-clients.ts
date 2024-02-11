import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClients1707390964242 implements MigrationInterface {
    name = 'AddClients1707390964242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "lastName" SET DEFAULT ''`);
        await queryRunner.query(`CREATE INDEX "IDX_2909f81b16e041233ee53bb48d" ON "Client" ("companyId") `);
        await queryRunner.query(`ALTER TABLE "Client" ADD CONSTRAINT "FK_2909f81b16e041233ee53bb48dd" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP CONSTRAINT "FK_2909f81b16e041233ee53bb48dd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2909f81b16e041233ee53bb48d"`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "lastName" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "companyId"`);
    }

}
