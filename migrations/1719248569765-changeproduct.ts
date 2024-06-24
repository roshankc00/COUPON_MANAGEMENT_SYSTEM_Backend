import { MigrationInterface, QueryRunner } from "typeorm";

export class Changeproduct1719248569765 implements MigrationInterface {
    name = 'Changeproduct1719248569765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "toolTipImagebulbName" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "toolTipImageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "appstoreLink" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "playstoreLink" character varying`);
        await queryRunner.query(`ALTER TABLE "product" ADD "tags" text array`);
        await queryRunner.query(`ALTER TABLE "product" ADD "fields" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "fields"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "playstoreLink"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "appstoreLink"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "toolTipImageUrl"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "toolTipImagebulbName"`);
    }

}
