import { MigrationInterface, QueryRunner } from "typeorm";

export class Alltables1715188394441 implements MigrationInterface {
    name = 'Alltables1715188394441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seo" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_1f4d901235e446a56be49bde191" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "featured" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL DEFAULT true, "seoId" integer, CONSTRAINT "REL_3e6a5c65355e83f111cb86141e" UNIQUE ("seoId"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "categoryId" integer, "seoId" integer, CONSTRAINT "REL_cdc9b11e0b6e1f57e85cc9828d" UNIQUE ("seoId"), CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "tagLine" character varying NOT NULL, "code" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "expireDate" TIMESTAMP NOT NULL, "url" character varying NOT NULL, "featured" boolean NOT NULL DEFAULT false, "categoryId" integer NOT NULL, "subCategoryId" integer NOT NULL, "storeId" integer NOT NULL, "verified" boolean NOT NULL DEFAULT false, "exclusive" boolean NOT NULL DEFAULT false, "status" boolean NOT NULL DEFAULT true, "seoId" integer, CONSTRAINT "REL_b36020792e47d3279a202448e3" UNIQUE ("seoId"), CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "showInMenu" boolean NOT NULL, "featured" boolean NOT NULL, "status" boolean NOT NULL, "seoId" integer, CONSTRAINT "REL_2951da6f23cc7940f6a1c8547b" UNIQUE ("seoId"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "phoneNumber" character varying, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT false, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_3e6a5c65355e83f111cb86141ef" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_cdc9b11e0b6e1f57e85cc9828d1" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_5c844474407f18320b2d16f415b" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_b36020792e47d3279a202448e38" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_2951da6f23cc7940f6a1c8547b3" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_2951da6f23cc7940f6a1c8547b3"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_b36020792e47d3279a202448e38"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_5c844474407f18320b2d16f415b"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_cdc9b11e0b6e1f57e85cc9828d1"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_3e6a5c65355e83f111cb86141ef"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "seo"`);
    }

}
