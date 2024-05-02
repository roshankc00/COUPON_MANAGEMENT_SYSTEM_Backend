import { MigrationInterface, QueryRunner } from "typeorm";

export class Changedexpiredate1714650832553 implements MigrationInterface {
    name = 'Changedexpiredate1714650832553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" RENAME COLUMN "ExpireDate" TO "expireDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" RENAME COLUMN "expireDate" TO "ExpireDate"`);
    }

}
