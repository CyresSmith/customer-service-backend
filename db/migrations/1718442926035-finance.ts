import { MigrationInterface, QueryRunner } from "typeorm";

export class Finance1718442926035 implements MigrationInterface {
    name = 'Finance1718442926035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "TransactionCategory" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "PK_da22282d01be8dc196911932bb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Transaction" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "month" integer NOT NULL, "day" integer NOT NULL, "time" integer NOT NULL, "amount" integer NOT NULL, "type" character varying NOT NULL, "comments" character varying DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer NOT NULL, "cashboxId" integer NOT NULL, "toCashboxId" integer, "clientId" integer, "creatorId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_21eda4daffd2c60f76b81a270e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f2959b427b106abd7069ba7292" ON "Transaction" ("companyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_569f271afcee45fdb7a5242368" ON "Transaction" ("cashboxId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d095fea445736e4ddce1dc1aa" ON "Transaction" ("toCashboxId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d8f2785390fc886e558390679" ON "Transaction" ("creatorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fb948449e33778520b6b837ba1" ON "Transaction" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "Cashbox" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "balance" integer NOT NULL, "comment" character varying NOT NULL DEFAULT '', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "responsibleId" integer NOT NULL, "companyId" integer NOT NULL, CONSTRAINT "PK_93616395abfbcaf1a39fa5dd904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions_employees" ("transactionId" integer NOT NULL, "employeeId" integer NOT NULL, CONSTRAINT "PK_86ac9c98ad8b859a16c52d61999" PRIMARY KEY ("transactionId", "employeeId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3c13dd82eaa265709febba0a65" ON "transactions_employees" ("transactionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_406a8a90322168345738cc50aa" ON "transactions_employees" ("employeeId") `);
        await queryRunner.query(`ALTER TABLE "Event" ADD "amount" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "Event" ADD "transactionId" integer`);
        await queryRunner.query(`ALTER TABLE "Event" ADD CONSTRAINT "FK_a3d5883c9e72662c5e0ab4f51ff" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "TransactionCategory" ADD CONSTRAINT "FK_b7d6324eb794474c275e1271aa0" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_f2959b427b106abd7069ba72929" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_569f271afcee45fdb7a52423686" FOREIGN KEY ("cashboxId") REFERENCES "Cashbox"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_5d095fea445736e4ddce1dc1aad" FOREIGN KEY ("toCashboxId") REFERENCES "Cashbox"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_b5c501f9a9956676469ef8692cf" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_3d8f2785390fc886e558390679e" FOREIGN KEY ("creatorId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Transaction" ADD CONSTRAINT "FK_fb948449e33778520b6b837ba18" FOREIGN KEY ("categoryId") REFERENCES "TransactionCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Cashbox" ADD CONSTRAINT "FK_38dbe7aba68b52fe8f1772626a5" FOREIGN KEY ("responsibleId") REFERENCES "Employee"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "Cashbox" ADD CONSTRAINT "FK_6da1a033566b45dea005dd397c4" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transactions_employees" ADD CONSTRAINT "FK_3c13dd82eaa265709febba0a655" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transactions_employees" ADD CONSTRAINT "FK_406a8a90322168345738cc50aa5" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions_employees" DROP CONSTRAINT "FK_406a8a90322168345738cc50aa5"`);
        await queryRunner.query(`ALTER TABLE "transactions_employees" DROP CONSTRAINT "FK_3c13dd82eaa265709febba0a655"`);
        await queryRunner.query(`ALTER TABLE "Cashbox" DROP CONSTRAINT "FK_6da1a033566b45dea005dd397c4"`);
        await queryRunner.query(`ALTER TABLE "Cashbox" DROP CONSTRAINT "FK_38dbe7aba68b52fe8f1772626a5"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_fb948449e33778520b6b837ba18"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_3d8f2785390fc886e558390679e"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_b5c501f9a9956676469ef8692cf"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_5d095fea445736e4ddce1dc1aad"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_569f271afcee45fdb7a52423686"`);
        await queryRunner.query(`ALTER TABLE "Transaction" DROP CONSTRAINT "FK_f2959b427b106abd7069ba72929"`);
        await queryRunner.query(`ALTER TABLE "TransactionCategory" DROP CONSTRAINT "FK_b7d6324eb794474c275e1271aa0"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP CONSTRAINT "FK_a3d5883c9e72662c5e0ab4f51ff"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "Event" DROP COLUMN "amount"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_406a8a90322168345738cc50aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3c13dd82eaa265709febba0a65"`);
        await queryRunner.query(`DROP TABLE "transactions_employees"`);
        await queryRunner.query(`DROP TABLE "Cashbox"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb948449e33778520b6b837ba1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d8f2785390fc886e558390679"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d095fea445736e4ddce1dc1aa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_569f271afcee45fdb7a5242368"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f2959b427b106abd7069ba7292"`);
        await queryRunner.query(`DROP TABLE "Transaction"`);
        await queryRunner.query(`DROP TABLE "TransactionCategory"`);
    }

}
