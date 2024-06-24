import { MigrationInterface, QueryRunner } from "typeorm";

export class Order1718909140991 implements MigrationInterface {
    name = 'Order1718909140991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "topUpId" character varying`);
        await queryRunner.query(`ALTER TABLE "order" ADD "usercontent" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "usercontent"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "topUpId"`);
    }

}
