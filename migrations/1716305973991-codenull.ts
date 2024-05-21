import { MigrationInterface, QueryRunner } from "typeorm";

export class Codenull1716305973991 implements MigrationInterface {
    name = 'Codenull1716305973991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "code" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon" ALTER COLUMN "code" SET NOT NULL`);
    }

}
