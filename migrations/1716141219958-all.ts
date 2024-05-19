import { MigrationInterface, QueryRunner } from "typeorm";

export class All1716141219958 implements MigrationInterface {
    name = 'All1716141219958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "blog" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "thumbnail" character varying NOT NULL, CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "blog_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "content" character varying NOT NULL, "imageName" character varying NOT NULL, "blogId" integer, CONSTRAINT "PK_19ac928aa4815e2264220fd64ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "couponId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_ad46d0f62363e132a5f21f33da2"`);
        await queryRunner.query(`ALTER TABLE "feedback" ALTER COLUMN "couponId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "blog_item" ADD CONSTRAINT "FK_e887bf58b7f1af6b7bcafa1f9b7" FOREIGN KEY ("blogId") REFERENCES "blog"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_ad46d0f62363e132a5f21f33da2" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_ad46d0f62363e132a5f21f33da2"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c"`);
        await queryRunner.query(`ALTER TABLE "blog_item" DROP CONSTRAINT "FK_e887bf58b7f1af6b7bcafa1f9b7"`);
        await queryRunner.query(`ALTER TABLE "feedback" ALTER COLUMN "couponId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_ad46d0f62363e132a5f21f33da2" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "couponId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "blog_item"`);
        await queryRunner.query(`DROP TABLE "blog"`);
    }

}
