import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastRunAtColumn1758036063441 implements MigrationInterface {
  name = 'AddLastRunAtColumn1758036063441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sys_cron" ADD "lastRunAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sys_cron" DROP COLUMN "lastRunAt"`);
  }
}
