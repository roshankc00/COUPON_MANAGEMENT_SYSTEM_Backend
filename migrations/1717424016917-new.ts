import { MigrationInterface, QueryRunner } from "typeorm";

export class New1717424016917 implements MigrationInterface {
    name = 'New1717424016917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "affiliate_link" ADD "tagLine" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" ADD "cashbackAmountPer" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "affiliate_link" DROP COLUMN "cashbackAmountPer"`);
        await queryRunner.query(`ALTER TABLE "affiliate_link" DROP COLUMN "tagLine"`);
    }

}
