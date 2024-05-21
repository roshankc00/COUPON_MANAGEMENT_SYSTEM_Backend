import { MigrationInterface, QueryRunner } from "typeorm";

export class Rem1716307820253 implements MigrationInterface {
    name = 'Rem1716307820253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "isDeal" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "isDeal" SET DEFAULT false`);
    }

}
