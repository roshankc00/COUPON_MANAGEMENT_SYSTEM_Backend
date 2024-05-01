import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatedcat1714553235036 implements MigrationInterface {
    name = 'Updatedcat1714553235036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" ADD "seoId" integer`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_2951da6f23cc7940f6a1c8547b3" UNIQUE ("seoId")`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_2951da6f23cc7940f6a1c8547b3" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_2951da6f23cc7940f6a1c8547b3"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_2951da6f23cc7940f6a1c8547b3"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "seoId"`);
    }

}
