import { MigrationInterface, QueryRunner } from "typeorm";

export class Me1721215105002 implements MigrationInterface {
    name = 'Me1721215105002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_20a3ff9da4a5a53973609fa2d2c" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
