import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransactionAccepted1757736096711 implements MigrationInterface {
    name = 'AddTransactionAccepted1757736096711'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ADD "isAccepted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "isAccepted"`);
    }

}
