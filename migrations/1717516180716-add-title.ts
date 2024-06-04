import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTitle1717516180716 implements MigrationInterface {
    name = 'AddTitle1717516180716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "title"`);
    }

}
