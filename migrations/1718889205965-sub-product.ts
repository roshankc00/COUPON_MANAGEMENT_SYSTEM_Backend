import { MigrationInterface, QueryRunner } from "typeorm";

export class SubProduct1718889205965 implements MigrationInterface {
    name = 'SubProduct1718889205965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_6301707ec7d024a508c5239fa44"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_88991860e839c6153a7ec878d39"`);
        await queryRunner.query(`CREATE TABLE "sub_product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_dbd7d1218ba4cbd488015d898dc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "submit_offer" DROP COLUMN "imageName"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "submit_offer" ADD "bulbName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "submit_offer" ADD "imageUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "license" ADD "subProductId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "bulbName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD "imageUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "subProductId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_4f6e680acb8123df5630dca0784" FOREIGN KEY ("subProductId") REFERENCES "sub_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_product" ADD CONSTRAINT "FK_b036f4793aba763267ce5c11477" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_d537a0d5ff12934a8e53b1d3df5" FOREIGN KEY ("subProductId") REFERENCES "sub_product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_d537a0d5ff12934a8e53b1d3df5"`);
        await queryRunner.query(`ALTER TABLE "sub_product" DROP CONSTRAINT "FK_b036f4793aba763267ce5c11477"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_4f6e680acb8123df5630dca0784"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "subProductId"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "bulbName"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "subProductId"`);
        await queryRunner.query(`ALTER TABLE "submit_offer" DROP COLUMN "imageUrl"`);
        await queryRunner.query(`ALTER TABLE "submit_offer" DROP COLUMN "bulbName"`);
        await queryRunner.query(`ALTER TABLE "order" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "license" ADD "productId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "submit_offer" ADD "imageName" character varying`);
        await queryRunner.query(`DROP TABLE "sub_product"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_88991860e839c6153a7ec878d39" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_6301707ec7d024a508c5239fa44" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
