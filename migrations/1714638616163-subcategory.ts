import { MigrationInterface, QueryRunner } from "typeorm";

export class Subcategory1714638616163 implements MigrationInterface {
    name = 'Subcategory1714638616163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "status" boolean NOT NULL DEFAULT true, "categoryId" integer, "seoId" integer, CONSTRAINT "REL_cdc9b11e0b6e1f57e85cc9828d" UNIQUE ("seoId"), CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_cdc9b11e0b6e1f57e85cc9828d1" FOREIGN KEY ("seoId") REFERENCES "seo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_cdc9b11e0b6e1f57e85cc9828d1"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
    }

}
