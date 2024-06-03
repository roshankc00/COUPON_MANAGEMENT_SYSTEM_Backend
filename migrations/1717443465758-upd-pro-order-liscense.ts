import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdProOrderLiscense1717443465758 implements MigrationInterface {
    name = 'UpdProOrderLiscense1717443465758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "orderId"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_6301707ec7d024a508c5239fa44"`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_6301707ec7d024a508c5239fa44" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_6301707ec7d024a508c5239fa44"`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_6301707ec7d024a508c5239fa44" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "license" ADD "orderId" integer NOT NULL`);
    }

}
