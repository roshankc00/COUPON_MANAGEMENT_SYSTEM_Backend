import { MigrationInterface, QueryRunner } from "typeorm";

export class Updpuchasetable1716146169426 implements MigrationInterface {
    name = 'Updpuchasetable1716146169426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "purchase" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "couponId" integer NOT NULL, "date" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "PK_86cc2ebeb9e17fc9c0774b05f69" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cashback_status_enum" AS ENUM('enabled', 'disabled', 'pending')`);
        await queryRunner.query(`CREATE TABLE "cashback" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "couponId" integer NOT NULL, "status" "public"."cashback_status_enum" NOT NULL DEFAULT 'pending', "userId" integer, CONSTRAINT "PK_367dfa7e4e15d45766d2260e3e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_17fcb3452f906f53adf8b86bde9" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD CONSTRAINT "FK_1191432874051240816275e741f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cashback" ADD CONSTRAINT "FK_392971946fd2bee32439ccd7122" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cashback" DROP CONSTRAINT "FK_392971946fd2bee32439ccd7122"`);
        await queryRunner.query(`ALTER TABLE "cashback" DROP CONSTRAINT "FK_1191432874051240816275e741f"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_17fcb3452f906f53adf8b86bde9"`);
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_33520b6c46e1b3971c0a649d38b"`);
        await queryRunner.query(`DROP TABLE "cashback"`);
        await queryRunner.query(`DROP TYPE "public"."cashback_status_enum"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
    }

}
