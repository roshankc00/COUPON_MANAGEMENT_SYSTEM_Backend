import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderId1719258761274 implements MigrationInterface {
    name = 'OrderId1719258761274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "usercontent" TO "otherId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" RENAME COLUMN "otherId" TO "usercontent"`);
    }

}
