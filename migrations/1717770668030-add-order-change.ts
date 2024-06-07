import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderChange1717770668030 implements MigrationInterface {
    name = 'AddOrderChange1717770668030'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "license" ADD "expireDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD "validityDays" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD "assigned" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_6301707ec7d024a508c5239fa44" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_6301707ec7d024a508c5239fa44"`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "assigned"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "validityDays"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "expireDate"`);
        await queryRunner.query(`ALTER TABLE "license" ADD "name" character varying NOT NULL`);
    }

}
