import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1705405171682 implements MigrationInterface {
    name = 'Init1705405171682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Client" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_52a680558a223b6d56df62bbacd" UNIQUE ("email"), CONSTRAINT "UQ_654225f12920ca45101fc40f1f2" UNIQUE ("phone"), CONSTRAINT "PK_b79874c8d411b839b9ccc301972" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_dce346cb64f739227d3910a77d2" UNIQUE ("name"), CONSTRAINT "PK_b4993a6b3d3194767a59698298f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying NOT NULL, "refreshToken" character varying, "verify" boolean NOT NULL DEFAULT false, "verificationCode" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "UQ_1f5c894f79cd0159ff4e1a44508" UNIQUE ("phone"), CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "Company"`);
        await queryRunner.query(`DROP TABLE "Client"`);
    }

}
