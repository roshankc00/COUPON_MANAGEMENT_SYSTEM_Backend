import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderProduct1719820322437 implements MigrationInterface {
    name = 'OrderProduct1719820322437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "otherId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "topUpId"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "orderDetails" jsonb`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "fields"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "fields" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "fields"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "fields" text array`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderDetails"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "topUpId" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "otherId" character varying`);
    }

}
