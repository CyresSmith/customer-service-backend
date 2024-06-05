import { MigrationInterface, QueryRunner } from "typeorm";

export class Finance1717592510199 implements MigrationInterface {
    name = 'Finance1717592510199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TransactionCategory" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_da22282d01be8dc196911932bb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transaction" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "month" integer NOT NULL, "day" integer NOT NULL, "time" character varying NOT NULL, "amount" integer NOT NULL, "type" character varying NOT NULL, "comments" character varying DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "cashboxId" integer NOT NULL, "clientId" integer, "employeeId" integer, "creatorId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_21eda4daffd2c60f76b81a270e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_569f271afcee45fdb7a5242368" ON "Transaction" ("cashboxId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d8f2785390fc886e558390679" ON "Transaction" ("creatorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb948449e33778520b6b837ba1" ON "Transaction" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "Cashbox" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "balance" integer NOT NULL, "comment" character varying NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "responsibleId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_93616395abfbcaf1a39fa5dd904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_569f271afcee45fdb7a52423686" FOREIGN KEY ("cashboxId") REFERENCES "Cashbox"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_b5c501f9a9956676469ef8692cf" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_d77c6d454a9a4286649560fdf02" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_3d8f2785390fc886e558390679e" FOREIGN KEY ("creatorId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_fb948449e33778520b6b837ba18" FOREIGN KEY ("categoryId") REFERENCES "TransactionCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Cashbox" ADD CONSTRAINT "FK_38dbe7aba68b52fe8f1772626a5" FOREIGN KEY ("responsibleId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Cashbox" ADD CONSTRAINT "FK_6da1a033566b45dea005dd397c4" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Cashbox" DROP CONSTRAINT "FK_6da1a033566b45dea005dd397c4"`);
        await queryRunner.query(`ALTER TABLE "Cashbox" DROP CONSTRAINT "FK_38dbe7aba68b52fe8f1772626a5"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_fb948449e33778520b6b837ba18"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_3d8f2785390fc886e558390679e"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_d77c6d454a9a4286649560fdf02"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_b5c501f9a9956676469ef8692cf"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_569f271afcee45fdb7a52423686"`);
        await queryRunner.query(`DROP TABLE "Cashbox"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb948449e33778520b6b837ba1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d8f2785390fc886e558390679"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_569f271afcee45fdb7a5242368"`);
        await queryRunner.query(`DROP TABLE "Transaction"`);
        await queryRunner.query(`DROP TABLE "TransactionCategory"`);
    }

}
