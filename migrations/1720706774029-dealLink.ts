import { MigrationInterface, QueryRunner } from "typeorm";

export class DealLink1720706774029 implements MigrationInterface {
    name = 'DealLink1720706774029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ADD "dealLink" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "dealLink"`);
    }

}
