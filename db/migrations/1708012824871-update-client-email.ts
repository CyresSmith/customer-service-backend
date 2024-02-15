import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateClientEmail1708012824871 implements MigrationInterface {
    name = 'UpdateClientEmail1708012824871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "email" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Client" ALTER COLUMN "email" DROP DEFAULT`);
    }

}
