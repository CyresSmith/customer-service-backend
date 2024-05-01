import { MigrationInterface, QueryRunner } from "typeorm";

export class AddChannelMessage1714412768964 implements MigrationInterface {
    name = 'AddChannelMessage1714412768964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Message" ("id" SERIAL NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fromId" integer, "channelId" integer, CONSTRAINT "PK_7dd6398f0d1dcaf73df342fa325" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac9b45551c8bcebfdcbed370d5" ON "Message" ("fromId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ccb70ace6d1699eeedf7ccb845" ON "Message" ("channelId") `);
        await queryRunner.query(`CREATE TABLE "Channel" ("id" SERIAL NOT NULL, "name" character varying DEFAULT '', "avatar" character varying DEFAULT '', "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "PK_6d056453ccffaba933ac36ddbd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_channels" ("channelId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_0d5128e826bdf939f1b84099fb3" PRIMARY KEY ("channelId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78bcc1979bacc863da2830689a" ON "users_channels" ("channelId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5d086ee0945b7540f36b445137" ON "users_channels" ("userId") `);
        await queryRunner.query(`ALTER TABLE "User" ADD "isOnline" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Message" ADD CONSTRAINT "FK_ac9b45551c8bcebfdcbed370d55" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Message" ADD CONSTRAINT "FK_ccb70ace6d1699eeedf7ccb8455" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Channel" ADD CONSTRAINT "FK_327669f911c9b7115f66fcf66fa" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_channels" ADD CONSTRAINT "FK_78bcc1979bacc863da2830689a1" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_channels" ADD CONSTRAINT "FK_5d086ee0945b7540f36b4451370" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_channels" DROP CONSTRAINT "FK_5d086ee0945b7540f36b4451370"`);
        await queryRunner.query(`ALTER TABLE "users_channels" DROP CONSTRAINT "FK_78bcc1979bacc863da2830689a1"`);
        await queryRunner.query(`ALTER TABLE "Channel" DROP CONSTRAINT "FK_327669f911c9b7115f66fcf66fa"`);
        await queryRunner.query(`ALTER TABLE "Message" DROP CONSTRAINT "FK_ccb70ace6d1699eeedf7ccb8455"`);
        await queryRunner.query(`ALTER TABLE "Message" DROP CONSTRAINT "FK_ac9b45551c8bcebfdcbed370d55"`);
        await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "isOnline"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5d086ee0945b7540f36b445137"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78bcc1979bacc863da2830689a"`);
        await queryRunner.query(`DROP TABLE "users_channels"`);
        await queryRunner.query(`DROP TABLE "Channel"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ccb70ace6d1699eeedf7ccb845"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac9b45551c8bcebfdcbed370d5"`);
        await queryRunner.query(`DROP TABLE "Message"`);
    }

}
