import { MigrationInterface, QueryRunner } from "typeorm";

export class Change1716728675966 implements MigrationInterface {
    name = 'Change1716728675966'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_9ff444e64b6392e88de12e205a2"`);
        await queryRunner.query(`ALTER TABLE "store" DROP COLUMN "followerId"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD "storeId" integer`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "REL_6fe328c3c08b70a5c9c7934883"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_5a5fc532d40d62aa3ac3b4740f7" FOREIGN KEY ("storeId") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_5a5fc532d40d62aa3ac3b4740f7"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "REL_6fe328c3c08b70a5c9c7934883" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_6fe328c3c08b70a5c9c79348839" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" DROP COLUMN "storeId"`);
        await queryRunner.query(`ALTER TABLE "store" ADD "followerId" integer`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_9ff444e64b6392e88de12e205a2" FOREIGN KEY ("followerId") REFERENCES "follower"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
