import { MigrationInterface, QueryRunner } from "typeorm";

export class Tr1717425002953 implements MigrationInterface {
    name = 'Tr1717425002953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_9790ee69a2507f89f9225df6a61"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "REL_9790ee69a2507f89f9225df6a6"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "affiliateLinkId"`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" ADD "storeId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" ADD CONSTRAINT "UQ_56066e315454e89825386d8e4c1" UNIQUE ("storeId")`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" ADD CONSTRAINT "FK_56066e315454e89825386d8e4c1" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "affiliate_link" DROP CONSTRAINT "FK_56066e315454e89825386d8e4c1"`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" DROP CONSTRAINT "UQ_56066e315454e89825386d8e4c1"`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "affiliateLinkId" integer`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "REL_9790ee69a2507f89f9225df6a6" UNIQUE ("affiliateLinkId")`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_9790ee69a2507f89f9225df6a61" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
