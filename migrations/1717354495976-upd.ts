import { MigrationInterface, QueryRunner } from "typeorm";

export class Upd1717354495976 implements MigrationInterface {
    name = 'Upd1717354495976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_1cc47fc52851625891eec5daf8a"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "wishlistId"`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD "couponId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87"`);
        await queryRunner.query(`ALTER TABLE "wishlist" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "REL_f6eeb74a295e2aad03b76b0ba8"`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_5f14581dba541e5e614c20d99c8" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_5f14581dba541e5e614c20d99c8"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87"`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "REL_f6eeb74a295e2aad03b76b0ba8" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "wishlist" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "couponId"`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "wishlistId" integer`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_1cc47fc52851625891eec5daf8a" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
