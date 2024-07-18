import { MigrationInterface, QueryRunner } from "typeorm";

export class Removenul1721254288417 implements MigrationInterface {
    name = 'Removenul1721254288417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "subProductTitle" character varying`);
        await queryRunner.query(`ALTER TABLE "sub_product" ADD "order" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_product" DROP COLUMN "order"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "subProductTitle"`);
    }

}
