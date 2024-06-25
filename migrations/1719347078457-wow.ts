import { MigrationInterface, QueryRunner } from "typeorm";

export class Wow1719347078457 implements MigrationInterface {
    name = 'Wow1719347078457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_3bc6b433d42caf28e9fab2d5c0f"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_3bc6b433d42caf28e9fab2d5c0f"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "orderId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_3bc6b433d42caf28e9fab2d5c0f" UNIQUE ("orderId")`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_3bc6b433d42caf28e9fab2d5c0f" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
