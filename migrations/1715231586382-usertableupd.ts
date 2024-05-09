import { MigrationInterface, QueryRunner } from "typeorm";

export class Usertableupd1715231586382 implements MigrationInterface {
    name = 'Usertableupd1715231586382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "resetPasswordToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "resetDateExpire" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetDateExpire"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetPasswordToken"`);
    }

}
