import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBank1757861513827 implements MigrationInterface {
  name = 'UpdateBank1757861513827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_item" ADD "bankId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_item" ADD CONSTRAINT "FK_445d870570eb0f30bfd95449b6b" FOREIGN KEY ("bankId") REFERENCES "bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transaction_item" DROP CONSTRAINT "FK_445d870570eb0f30bfd95449b6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "transaction_item" DROP COLUMN "bankId"`,
    );
  }
}
