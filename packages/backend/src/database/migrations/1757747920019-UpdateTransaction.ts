import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTransaction1757747920019 implements MigrationInterface {
    name = 'UpdateTransaction1757747920019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_fae09ef9b1765a71a91475f8ba7"`);
        await queryRunner.query(`CREATE TABLE "transaction_item" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLocked" boolean NOT NULL DEFAULT false, "quantity" integer NOT NULL, "expirationDate" date NOT NULL, "itemTypeId" integer, "transactionId" integer, CONSTRAINT "PK_b40595241a69876722f692d041f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "expirationDate"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP COLUMN "itemId"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transaction_item" ADD CONSTRAINT "FK_f224d1e304b454eb2f67dd83789" FOREIGN KEY ("itemTypeId") REFERENCES "item_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_item" ADD CONSTRAINT "FK_2705caeb66a0fa4505f53f04e8f" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_item" DROP CONSTRAINT "FK_2705caeb66a0fa4505f53f04e8f"`);
        await queryRunner.query(`ALTER TABLE "transaction_item" DROP CONSTRAINT "FK_f224d1e304b454eb2f67dd83789"`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "itemId" integer`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "expirationDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "transaction_item"`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_fae09ef9b1765a71a91475f8ba7" FOREIGN KEY ("itemId") REFERENCES "item_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
