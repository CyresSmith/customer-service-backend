import { MigrationInterface, QueryRunner } from "typeorm";

export class EditClient1707394211926 implements MigrationInterface {
    name = 'EditClient1707394211926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP CONSTRAINT "UQ_52a680558a223b6d56df62bbacd"`);
        await queryRunner.query(`ALTER TABLE "Client" DROP CONSTRAINT "UQ_654225f12920ca45101fc40f1f2"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" ADD CONSTRAINT "UQ_654225f12920ca45101fc40f1f2" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "Client" ADD CONSTRAINT "UQ_52a680558a223b6d56df62bbacd" UNIQUE ("email")`);
    }

}
