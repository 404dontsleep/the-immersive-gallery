import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBankResultProcessed1757871639790 implements MigrationInterface {
    name = 'AddBankResultProcessed1757871639790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_result" ADD "isProcessed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "bank_result" DROP COLUMN "isProcessed"`);
    }

}
