import { MigrationInterface, QueryRunner } from "typeorm";

export class Again1721294905768 implements MigrationInterface {
    name = 'Again1721294905768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "slug" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "slug" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "slug" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "slug" DROP NOT NULL`);
    }

}
