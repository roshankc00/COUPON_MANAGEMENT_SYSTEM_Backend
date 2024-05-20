import { MigrationInterface, QueryRunner } from "typeorm";

export class All1716187006475 implements MigrationInterface {
    name = 'All1716187006475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "url"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ADD "url" character varying NOT NULL`);
    }

}
