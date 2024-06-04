import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeIspaid1717518971597 implements MigrationInterface {
    name = 'ChangeIspaid1717518971597'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "isPaid" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "isPaid"`);
    }

}
