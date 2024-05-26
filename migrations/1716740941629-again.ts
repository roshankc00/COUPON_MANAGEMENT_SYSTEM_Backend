import { MigrationInterface, QueryRunner } from "typeorm";

export class Again1716740941629 implements MigrationInterface {
    name = 'Again1716740941629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_5a5fc532d40d62aa3ac3b4740f7"`);
        await queryRunner.query(`ALTER TABLE "follower" RENAME COLUMN "storeId" TO "storesId"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "followersId" integer`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_c35e2de599cf692b5295d2c7d97" FOREIGN KEY ("followersId") REFERENCES "follower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_27b1f45c8a57c21a076a11e7640" FOREIGN KEY ("storesId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_27b1f45c8a57c21a076a11e7640"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_c35e2de599cf692b5295d2c7d97"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "followersId"`);
        await queryRunner.query(`ALTER TABLE "follower" RENAME COLUMN "storesId" TO "storeId"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_5a5fc532d40d62aa3ac3b4740f7" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
