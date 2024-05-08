import { MigrationInterface, QueryRunner } from "typeorm";

export class Imagefield1715191032650 implements MigrationInterface {
    name = 'Imagefield1715191032650'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ADD "imageName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coupon" ADD "imageName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD "imageName" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "imageName"`);
        await queryRunner.query(`ALTER TABLE "coupon" DROP COLUMN "imageName"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "imageName"`);
    }

}
