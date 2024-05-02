import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatedcoupon1714642877985 implements MigrationInterface {
    name = 'Updatedcoupon1714642877985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "tagLine" character varying NOT NULL, "code" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "ExpireDate" TIMESTAMP NOT NULL, "url" character varying NOT NULL, "featured" boolean NOT NULL DEFAULT false, "verified" boolean NOT NULL DEFAULT false, "exclusive" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL DEFAULT true, "categoryId" integer, "subCategoryId" integer, "storeId" integer, "seoId" integer, CONSTRAINT "REL_b36020792e47d3279a202448e3" UNIQUE ("seoId"), CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_5c844474407f18320b2d16f415b" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_b36020792e47d3279a202448e38" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_b36020792e47d3279a202448e38"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_5c844474407f18320b2d16f415b"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
    }

}
