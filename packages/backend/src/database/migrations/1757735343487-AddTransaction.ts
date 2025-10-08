import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransaction1757735343487 implements MigrationInterface {
    name = 'AddTransaction1757735343487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLocked" boolean NOT NULL DEFAULT false, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "expirationDate" date NOT NULL, "status" "public"."transaction_status_enum" NOT NULL, "fromUserId" integer, "toUserId" integer, "itemId" integer, CONSTRAINT "UQ_fcce0ce5cc7762e90d2cc7e2307" UNIQUE ("uuid"), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fcce0ce5cc7762e90d2cc7e230" ON "transaction" ("uuid") `);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_54e5bba9459dca68b774dc83afb" FOREIGN KEY ("fromUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_edc43668e21d028165c68991e10" FOREIGN KEY ("toUserId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_fae09ef9b1765a71a91475f8ba7" FOREIGN KEY ("itemId") REFERENCES "item_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_fae09ef9b1765a71a91475f8ba7"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_edc43668e21d028165c68991e10"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_54e5bba9459dca68b774dc83afb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fcce0ce5cc7762e90d2cc7e230"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_status_enum"`);
    }

}
