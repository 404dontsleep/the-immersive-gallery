import { MigrationInterface, QueryRunner } from "typeorm";

export class PermissionV21757165505996 implements MigrationInterface {
    name = 'PermissionV21757165505996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_has_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_e0210ef354af88fe1a90249dfde" PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_831fefbde639fd86c269a10679" ON "user_has_permission" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b2b7c3cc4a9b69c83d2eb8d92e" ON "user_has_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "sys_config" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sys_config_type_enum"`);
        await queryRunner.query(`ALTER TABLE "user_has_permission" ADD CONSTRAINT "FK_831fefbde639fd86c269a106791" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_has_permission" ADD CONSTRAINT "FK_b2b7c3cc4a9b69c83d2eb8d92ec" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_has_permission" DROP CONSTRAINT "FK_b2b7c3cc4a9b69c83d2eb8d92ec"`);
        await queryRunner.query(`ALTER TABLE "user_has_permission" DROP CONSTRAINT "FK_831fefbde639fd86c269a106791"`);
        await queryRunner.query(`CREATE TYPE "public"."sys_config_type_enum" AS ENUM('string', 'number', 'boolean', 'string[]', 'number[]', 'boolean[]')`);
        await queryRunner.query(`ALTER TABLE "sys_config" ADD "type" "public"."sys_config_type_enum" NOT NULL DEFAULT 'string'`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b2b7c3cc4a9b69c83d2eb8d92e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_831fefbde639fd86c269a10679"`);
        await queryRunner.query(`DROP TABLE "user_has_permission"`);
    }

}
