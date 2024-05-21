import { MigrationInterface, QueryRunner } from "typeorm";

export class Imagefieldadded1716276104769 implements MigrationInterface {
    name = 'Imagefieldadded1716276104769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submit_offer" ADD "imageName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submit_offer" DROP COLUMN "imageName"`);
    }

}
