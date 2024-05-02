import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangerelationStartegy1714654942303 implements MigrationInterface {
    name = 'ChangerelationStartegy1714654942303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_5c844474407f18320b2d16f415b"`);
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "subCategoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "storeId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_5c844474407f18320b2d16f415b" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_5c844474407f18320b2d16f415b"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66"`);
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "storeId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "subCategoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_5c844474407f18320b2d16f415b" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
