import { MigrationInterface, QueryRunner } from "typeorm";

export class Removenull1721243168364 implements MigrationInterface {
    name = 'Removenull1721243168364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "slug" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" ALTER COLUMN "slug" DROP NOT NULL`);
    }

}
