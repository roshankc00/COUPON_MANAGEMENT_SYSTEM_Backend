import { MigrationInterface, QueryRunner } from "typeorm";

export class Change1719342893694 implements MigrationInterface {
    name = 'Change1719342893694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" ADD "orderId" integer`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_3bc6b433d42caf28e9fab2d5c0f" UNIQUE ("orderId")`);
        await queryRunner.query(`ALTER TABLE "order" ADD "licenseId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "UQ_31e820731c1a6c3e6d4a3aeb82f" UNIQUE ("licenseId")`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "expireDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "validityDays" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "FK_3bc6b433d42caf28e9fab2d5c0f" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_31e820731c1a6c3e6d4a3aeb82f" FOREIGN KEY ("licenseId") REFERENCES "license"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_31e820731c1a6c3e6d4a3aeb82f"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_3bc6b433d42caf28e9fab2d5c0f"`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "validityDays" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "license" ALTER COLUMN "expireDate" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "UQ_31e820731c1a6c3e6d4a3aeb82f"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "licenseId"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_3bc6b433d42caf28e9fab2d5c0f"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "orderId"`);
    }

}
