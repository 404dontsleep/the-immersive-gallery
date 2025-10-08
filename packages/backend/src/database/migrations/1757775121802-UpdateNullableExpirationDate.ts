import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNullableExpirationDate1757775121802 implements MigrationInterface {
    name = 'UpdateNullableExpirationDate1757775121802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_item" ALTER COLUMN "expirationDate" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transaction_item" ALTER COLUMN "expirationDate" SET NOT NULL`);
    }

}
