import { MigrationInterface, QueryRunner } from "typeorm";

export class Me1721241546446 implements MigrationInterface {
    name = 'Me1721241546446'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "slug" character varying`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "slug" character varying`);
        await queryRunner.query(`ALTER TABLE "store" ADD "slug" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "slug" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "slug"`);
    }

}
