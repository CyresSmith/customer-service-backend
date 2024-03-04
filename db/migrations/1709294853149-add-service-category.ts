import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServiceCategory1709294853149 implements MigrationInterface {
    name = 'AddServiceCategory1709294853149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Service" DROP CONSTRAINT "FK_67f107076d6bd8d3925d4c11064"`);
        await queryRunner.query(`CREATE TABLE "serviceCategory" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'individual', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "PK_4d1e379dec18d0571ca6346e7fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "serviceCategory" ADD CONSTRAINT "FK_3795fa0bd252e272094e9d30bbd" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Service" ADD CONSTRAINT "FK_67f107076d6bd8d3925d4c11064" FOREIGN KEY ("categoryId") REFERENCES "serviceCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Service" DROP CONSTRAINT "FK_67f107076d6bd8d3925d4c11064"`);
        await queryRunner.query(`ALTER TABLE "serviceCategory" DROP CONSTRAINT "FK_3795fa0bd252e272094e9d30bbd"`);
        await queryRunner.query(`DROP TABLE "serviceCategory"`);
        await queryRunner.query(`ALTER TABLE "Service" ADD CONSTRAINT "FK_67f107076d6bd8d3925d4c11064" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
