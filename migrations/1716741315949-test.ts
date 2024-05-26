import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1716741315949 implements MigrationInterface {
    name = 'Test1716741315949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_c35e2de599cf692b5295d2c7d97"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_27b1f45c8a57c21a076a11e7640"`);
        await queryRunner.query(`ALTER TABLE "store" RENAME COLUMN "followersId" TO "followerId"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP COLUMN "storesId"`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_9ff444e64b6392e88de12e205a2" FOREIGN KEY ("followerId") REFERENCES "follower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_9ff444e64b6392e88de12e205a2"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD "storesId" integer`);
        await queryRunner.query(`ALTER TABLE "store" RENAME COLUMN "followerId" TO "followersId"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_27b1f45c8a57c21a076a11e7640" FOREIGN KEY ("storesId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_c35e2de599cf692b5295d2c7d97" FOREIGN KEY ("followersId") REFERENCES "follower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
