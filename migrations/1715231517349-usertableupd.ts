import { MigrationInterface, QueryRunner } from "typeorm";

export class Usertableupd1715231517349 implements MigrationInterface {
    name = 'Usertableupd1715231517349'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "resetPasswordToken" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "resetDateExpire" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetDateExpire"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "resetPasswordToken"`);
    }

}
