import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatedstore1714554830172 implements MigrationInterface {
    name = 'Updatedstore1714554830172'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ADD "seoId" integer`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "UQ_3e6a5c65355e83f111cb86141ef" UNIQUE ("seoId")`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_3e6a5c65355e83f111cb86141ef" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_3e6a5c65355e83f111cb86141ef"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "UQ_3e6a5c65355e83f111cb86141ef"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "seoId"`);
    }

}
