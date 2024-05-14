import { MigrationInterface, QueryRunner } from "typeorm";

export class Addfollowerandwishlisttable1715684340407 implements MigrationInterface {
    name = 'Addfollowerandwishlisttable1715684340407'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "UQ_f6eeb74a295e2aad03b76b0ba87" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "UQ_f6eeb74a295e2aad03b76b0ba87"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "userId"`);
    }

}
