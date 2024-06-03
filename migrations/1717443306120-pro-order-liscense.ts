import { MigrationInterface, QueryRunner } from "typeorm";

export class ProOrderLiscense1717443306120 implements MigrationInterface {
    name = 'ProOrderLiscense1717443306120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "license" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying NOT NULL, "orderId" integer NOT NULL, "userId" integer, "productId" integer, CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_product_type_enum" AS ENUM('gift_card', 'subscription')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "product_type" "public"."product_product_type_enum" NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'completed')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "status" "public"."order_status_enum" NOT NULL, "userId" integer, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_f820f122f2d64893c38b44a1943" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_6301707ec7d024a508c5239fa44" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_6301707ec7d024a508c5239fa44"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_f820f122f2d64893c38b44a1943"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_product_type_enum"`);
        await queryRunner.query(`DROP TABLE "license"`);
    }

}
