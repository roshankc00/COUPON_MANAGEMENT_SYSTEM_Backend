import { MigrationInterface, QueryRunner } from "typeorm";

export class Nametotitleseo1714552852526 implements MigrationInterface {
    name = 'Nametotitleseo1714552852526'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seo" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seo" RENAME COLUMN "title" TO "name"`);
    }

}
