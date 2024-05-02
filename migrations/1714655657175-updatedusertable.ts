import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatedusertable1714655657175 implements MigrationInterface {
    name = 'Updatedusertable1714655657175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
    }

}
