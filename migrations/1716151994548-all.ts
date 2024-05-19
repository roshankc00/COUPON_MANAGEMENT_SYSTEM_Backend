import { MigrationInterface, QueryRunner } from "typeorm";

export class All1716151994548 implements MigrationInterface {
    name = 'All1716151994548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cashback" DROP CONSTRAINT "FK_392971946fd2bee32439ccd7122"`);
        await queryRunner.query(`CREATE TABLE "affiliate_link" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "link" character varying NOT NULL, "merchant" character varying NOT NULL, "clicks" integer NOT NULL, "couponId" integer NOT NULL, CONSTRAINT "PK_4d8e59b42a53f7718de5c0a8002" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD "purchaseId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "affiliateLinkId" integer`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD CONSTRAINT "FK_4d0948f3bd8ccdabb87f1897347" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_8b9d6d6f5a7b1e46900d48458e1" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_8b9d6d6f5a7b1e46900d48458e1"`);
        await queryRunner.query(`ALTER TABLE "cashback" DROP CONSTRAINT "FK_4d0948f3bd8ccdabb87f1897347"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "affiliateLinkId"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "cashback" DROP COLUMN "purchaseId"`);
        await queryRunner.query(`ALTER TABLE "cashback" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "cashback" DROP COLUMN "createdAt"`);
        await queryRunner.query(`DROP TABLE "affiliate_link"`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD CONSTRAINT "FK_392971946fd2bee32439ccd7122" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
