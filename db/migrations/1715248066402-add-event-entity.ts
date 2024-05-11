import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventEntity1715248066402 implements MigrationInterface {
    name = 'AddEventEntity1715248066402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Event" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "duration" integer NOT NULL, "comments" character varying DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, "clientId" integer NOT NULL, "employeeId" integer NOT NULL, CONSTRAINT "PK_894abf6d0c8562b398c717414d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fde21b6f9052fbcfdd3669a40b" ON "Event" ("companyId") `);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_fde21b6f9052fbcfdd3669a40b3" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_6f95ef5fe835cdcf5cc1bc10935" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_ff9b0095bc31ef23645255ee9ed" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_ff9b0095bc31ef23645255ee9ed"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_6f95ef5fe835cdcf5cc1bc10935"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_fde21b6f9052fbcfdd3669a40b3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fde21b6f9052fbcfdd3669a40b"`);
        await queryRunner.query(`DROP TABLE "Event"`);
    }

}
