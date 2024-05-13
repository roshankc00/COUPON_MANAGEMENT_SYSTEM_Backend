import { MigrationInterface, QueryRunner } from "typeorm";

export class Addfaqstable1715622054475 implements MigrationInterface {
    name = 'Addfaqstable1715622054475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "resetPasswordToken" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "resetDateExpire" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "resetDateExpire" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "resetPasswordToken" SET NOT NULL`);
    }

}
