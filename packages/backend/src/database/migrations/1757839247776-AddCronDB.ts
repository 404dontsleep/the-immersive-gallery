import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCronDB1757839247776 implements MigrationInterface {
    name = 'AddCronDB1757839247776'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sys_cron" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLocked" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "cronExpression" character varying NOT NULL, "enabled" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_e6aa067346988351a455098d71d" UNIQUE ("name"), CONSTRAINT "PK_133008a7d58c64a1e6675c937fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transaction" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`DROP TABLE "sys_cron"`);
    }

}
