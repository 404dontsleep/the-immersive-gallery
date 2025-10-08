import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBankResult1757869990531 implements MigrationInterface {
    name = 'AddBankResult1757869990531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."BankResultType" AS ENUM('IN', 'OUT')`);
        await queryRunner.query(`CREATE TABLE "bank_result" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLocked" boolean NOT NULL DEFAULT false, "transactionID" character varying NOT NULL, "amount" integer NOT NULL, "description" character varying NOT NULL, "transactionDate" TIMESTAMP NOT NULL, "type" "public"."BankResultType" NOT NULL, "bankId" integer, CONSTRAINT "UQ_096cd6346b5595d45749eb1bdf3" UNIQUE ("transactionID"), CONSTRAINT "PK_5444314ccdad2f976dc3880c4cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "bank_result" ADD CONSTRAINT "FK_cfbcebefc2d1d0fdb0ee370858c" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_result" DROP CONSTRAINT "FK_cfbcebefc2d1d0fdb0ee370858c"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`DROP TABLE "bank_result"`);
        await queryRunner.query(`DROP TYPE "public"."BankResultType"`);
    }

}
