import { MigrationInterface, QueryRunner } from "typeorm";

export class Changepurchase1716457821852 implements MigrationInterface {
    name = 'Changepurchase1716457821852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_8b9d6d6f5a7b1e46900d48458e1"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "affiliateLinkId"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "affiliateLinkId" integer`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "UQ_9790ee69a2507f89f9225df6a61" UNIQUE ("affiliateLinkId")`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "transactionId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" ADD "apiKey" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_9790ee69a2507f89f9225df6a61" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_9790ee69a2507f89f9225df6a61"`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" DROP COLUMN "apiKey"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "transactionId"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "UQ_9790ee69a2507f89f9225df6a61"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "affiliateLinkId"`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "affiliateLinkId" integer`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_8b9d6d6f5a7b1e46900d48458e1" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
