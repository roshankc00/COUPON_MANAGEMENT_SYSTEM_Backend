import { MigrationInterface, QueryRunner } from "typeorm";

export class Me1721215261457 implements MigrationInterface {
    name = 'Me1721215261457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_5f14581dba541e5e614c20d99c8"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_5a5fc532d40d62aa3ac3b4740f7"`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_5f14581dba541e5e614c20d99c8" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_5a5fc532d40d62aa3ac3b4740f7" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_5a5fc532d40d62aa3ac3b4740f7"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_5f14581dba541e5e614c20d99c8"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_5a5fc532d40d62aa3ac3b4740f7" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_5f14581dba541e5e614c20d99c8" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
