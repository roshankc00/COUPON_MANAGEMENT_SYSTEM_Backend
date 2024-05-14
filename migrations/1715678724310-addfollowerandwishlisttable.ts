import { MigrationInterface, QueryRunner } from "typeorm";

export class Addfollowerandwishlisttable1715678724310 implements MigrationInterface {
    name = 'Addfollowerandwishlisttable1715678724310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "follower" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_6fe328c3c08b70a5c9c7934883" UNIQUE ("userId"), CONSTRAINT "PK_69e733c097e58ee41a00ccb02d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "store" ADD "followerId" integer`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "wishlistId" integer`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_9ff444e64b6392e88de12e205a2" FOREIGN KEY ("followerId") REFERENCES "follower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_1cc47fc52851625891eec5daf8a" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_1cc47fc52851625891eec5daf8a"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_9ff444e64b6392e88de12e205a2"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "wishlistId"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "followerId"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`DROP TABLE "follower"`);
    }

}
