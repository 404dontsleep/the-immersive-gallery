import { MigrationInterface, QueryRunner } from "typeorm";

export class Locker1756667644198 implements MigrationInterface {
    name = 'Locker1756667644198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission" ADD "isLocked" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user_permission" ADD "isLocked" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isLocked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isLocked"`);
        await queryRunner.query(`ALTER TABLE "user_permission" DROP COLUMN "isLocked"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP COLUMN "isLocked"`);
    }

}
