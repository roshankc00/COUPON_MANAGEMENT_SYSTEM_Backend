import { MigrationInterface, QueryRunner } from "typeorm";

export class Statusupd1715192967155 implements MigrationInterface {
    name = 'Statusupd1715192967155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."store_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`ALTER TABLE "store" ADD "status" "public"."store_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."sub_category_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "status" "public"."sub_category_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."coupon_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "status" "public"."coupon_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."category_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`ALTER TABLE "category" ADD "status" "public"."category_status_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."category_status_enum"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "status" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."coupon_status_enum"`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."sub_category_status_enum"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "status" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."store_status_enum"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "status" boolean NOT NULL DEFAULT true`);
    }

}
