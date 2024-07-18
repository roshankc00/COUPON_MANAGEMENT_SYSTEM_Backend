import { MigrationInterface, QueryRunner } from "typeorm";

export class Removeorder1721294491277 implements MigrationInterface {
    name = 'Removeorder1721294491277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_product" DROP COLUMN "order"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_product" ADD "order" integer`);
    }

}
