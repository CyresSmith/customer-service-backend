import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClient1708011707744 implements MigrationInterface {
    name = 'UpdateClient1708011707744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" ADD "source" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" DROP COLUMN "source"`);
    }

}
