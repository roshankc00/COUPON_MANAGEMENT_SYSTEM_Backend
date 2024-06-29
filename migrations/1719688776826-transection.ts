import { MigrationInterface, QueryRunner } from "typeorm";

export class Transection1719688776826 implements MigrationInterface {
    name = 'Transection1719688776826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "transectionId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "transectionId"`);
    }

}
