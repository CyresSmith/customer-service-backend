import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveEmployeeCategory1707424709211 implements MigrationInterface {
    name = 'RemoveEmployeeCategory1707424709211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employee" DROP CONSTRAINT "FK_fe6037e394d7ffa899f02fb6999"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fe6037e394d7ffa899f02fb699"`);
        await queryRunner.query(`ALTER TABLE "Employee" DROP COLUMN "categoryId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Employee" ADD "categoryId" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_fe6037e394d7ffa899f02fb699" ON "Employee" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "Employee" ADD CONSTRAINT "FK_fe6037e394d7ffa899f02fb6999" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
