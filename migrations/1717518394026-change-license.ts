import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLicense1717518394026 implements MigrationInterface {
    name = 'ChangeLicense1717518394026'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_6301707ec7d024a508c5239fa44"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "license" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_f820f122f2d64893c38b44a1943" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_f820f122f2d64893c38b44a1943"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "license" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_6301707ec7d024a508c5239fa44" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
