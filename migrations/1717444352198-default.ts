import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1717444352198 implements MigrationInterface {
    name = 'Default1717444352198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_f820f122f2d64893c38b44a1943"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "license" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_f820f122f2d64893c38b44a1943" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
