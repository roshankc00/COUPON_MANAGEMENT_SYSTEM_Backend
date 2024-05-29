import { MigrationInterface, QueryRunner } from "typeorm";

export class New1716924750901 implements MigrationInterface {
    name = 'New1716924750901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "seo" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_1f4d901235e446a56be49bde191" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wishlist" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_f6eeb74a295e2aad03b76b0ba8" UNIQUE ("userId"), CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."sub_category_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."sub_category_status_enum" NOT NULL, "categoryId" integer, "seoId" integer, CONSTRAINT "REL_cdc9b11e0b6e1f57e85cc9828d" UNIQUE ("seoId"), CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."category_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "imageName" character varying NOT NULL, "status" "public"."category_status_enum" NOT NULL, "showInMenu" boolean NOT NULL, "featured" boolean NOT NULL, "seoId" integer, CONSTRAINT "REL_2951da6f23cc7940f6a1c8547b" UNIQUE ("seoId"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "rating" double precision NOT NULL, "couponId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."coupon_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`CREATE TABLE "coupon" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "tagLine" character varying NOT NULL, "code" character varying, "startDate" TIMESTAMP NOT NULL, "expireDate" TIMESTAMP NOT NULL, "featured" boolean NOT NULL DEFAULT false, "categoryId" integer NOT NULL, "subCategoryId" integer NOT NULL, "storeId" integer NOT NULL, "imageName" character varying NOT NULL, "verified" boolean NOT NULL DEFAULT false, "exclusive" boolean NOT NULL DEFAULT false, "status" "public"."coupon_status_enum" NOT NULL, "isDeal" boolean NOT NULL, "seoId" integer, "wishlistId" integer, CONSTRAINT "REL_b36020792e47d3279a202448e3" UNIQUE ("seoId"), CONSTRAINT "PK_fcbe9d72b60eed35f46dc35a682" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."store_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "imageName" character varying NOT NULL, "featured" boolean NOT NULL DEFAULT false, "status" "public"."store_status_enum" NOT NULL, "seoId" integer, "followerId" integer, "affiliateLinkId" integer, CONSTRAINT "REL_3e6a5c65355e83f111cb86141e" UNIQUE ("seoId"), CONSTRAINT "REL_9790ee69a2507f89f9225df6a6" UNIQUE ("affiliateLinkId"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follower" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_69e733c097e58ee41a00ccb02d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."submit_offer_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`CREATE TABLE "submit_offer" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "code" character varying, "url" character varying NOT NULL, "tagLine" character varying NOT NULL, "startDate" TIMESTAMP NOT NULL, "expireDate" TIMESTAMP NOT NULL, "isDeal" boolean NOT NULL, "status" "public"."submit_offer_status_enum" NOT NULL, "imageName" character varying, "userId" integer, CONSTRAINT "PK_cb4ff71fa50a22dc53a64931226" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying, "phoneNumber" character varying, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT false, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "resetPasswordToken" character varying, "resetDateExpire" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cashback_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`CREATE TABLE "cashback" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "purchaseId" integer NOT NULL, "status" "public"."cashback_status_enum" NOT NULL DEFAULT 'pending', "userId" integer, CONSTRAINT "PK_367dfa7e4e15d45766d2260e3e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" integer NOT NULL, "affiliateLinkId" integer NOT NULL, "date" TIMESTAMP NOT NULL, "transactionId" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "affiliate_link" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "link" character varying NOT NULL, "merchant" character varying NOT NULL, "apiKey" character varying NOT NULL, "clicks" integer NOT NULL, CONSTRAINT "PK_4d8e59b42a53f7718de5c0a8002" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "thumbnail" character varying NOT NULL, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "content" character varying NOT NULL, "imageName" character varying, "blogId" integer, CONSTRAINT "PK_19ac928aa4815e2264220fd64ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faq" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "question" character varying NOT NULL, "answer" character varying NOT NULL, CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feedback" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "companyUrl" character varying, "message" character varying NOT NULL, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "home" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sliderImages" text array NOT NULL, CONSTRAINT "PK_012205783b51369c326a1ad4a64" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wishlist" ADD CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_cdc9b11e0b6e1f57e85cc9828d1" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_2951da6f23cc7940f6a1c8547b3" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_5c844474407f18320b2d16f415b" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_b36020792e47d3279a202448e38" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD CONSTRAINT "FK_1cc47fc52851625891eec5daf8a" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_3e6a5c65355e83f111cb86141ef" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_9ff444e64b6392e88de12e205a2" FOREIGN KEY ("followerId") REFERENCES "follower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_9790ee69a2507f89f9225df6a61" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "submit_offer" ADD CONSTRAINT "FK_9d9e0c21689e3ede429cf036d81" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD CONSTRAINT "FK_1191432874051240816275e741f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD CONSTRAINT "FK_4d0948f3bd8ccdabb87f1897347" FOREIGN KEY ("purchaseId") REFERENCES "purchase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_e64ccd38e262db9597a199e5337" FOREIGN KEY ("affiliateLinkId") REFERENCES "affiliate_link"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "blog_item" ADD CONSTRAINT "FK_e887bf58b7f1af6b7bcafa1f9b7" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blog_item" DROP CONSTRAINT "FK_e887bf58b7f1af6b7bcafa1f9b7"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_e64ccd38e262db9597a199e5337"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b"`);
        await queryRunner.query(`ALTER TABLE "cashback" DROP CONSTRAINT "FK_4d0948f3bd8ccdabb87f1897347"`);
        await queryRunner.query(`ALTER TABLE "cashback" DROP CONSTRAINT "FK_1191432874051240816275e741f"`);
        await queryRunner.query(`ALTER TABLE "submit_offer" DROP CONSTRAINT "FK_9d9e0c21689e3ede429cf036d81"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_9790ee69a2507f89f9225df6a61"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_9ff444e64b6392e88de12e205a2"`);
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_3e6a5c65355e83f111cb86141ef"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_1cc47fc52851625891eec5daf8a"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_b36020792e47d3279a202448e38"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_5c844474407f18320b2d16f415b"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_36f9172b6b9bc6cde9c730d4e14"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP CONSTRAINT "FK_7ac2227010228ec0f7d5280ca66"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_2951da6f23cc7940f6a1c8547b3"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_cdc9b11e0b6e1f57e85cc9828d1"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`ALTER TABLE "wishlist" DROP CONSTRAINT "FK_f6eeb74a295e2aad03b76b0ba87"`);
        await queryRunner.query(`DROP TABLE "home"`);
        await queryRunner.query(`DROP TABLE "feedback"`);
        await queryRunner.query(`DROP TABLE "faq"`);
        await queryRunner.query(`DROP TABLE "blog_item"`);
        await queryRunner.query(`DROP TABLE "blog"`);
        await queryRunner.query(`DROP TABLE "affiliate_link"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "cashback"`);
        await queryRunner.query(`DROP TYPE "public"."cashback_status_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "submit_offer"`);
        await queryRunner.query(`DROP TYPE "public"."submit_offer_status_enum"`);
        await queryRunner.query(`DROP TABLE "follower"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TYPE "public"."store_status_enum"`);
        await queryRunner.query(`DROP TABLE "coupon"`);
        await queryRunner.query(`DROP TYPE "public"."coupon_status_enum"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TYPE "public"."category_status_enum"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
        await queryRunner.query(`DROP TYPE "public"."sub_category_status_enum"`);
        await queryRunner.query(`DROP TABLE "wishlist"`);
        await queryRunner.query(`DROP TABLE "seo"`);
    }

}
