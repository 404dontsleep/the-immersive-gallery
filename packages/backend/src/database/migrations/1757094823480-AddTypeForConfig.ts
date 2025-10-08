import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeForConfig1757094823480 implements MigrationInterface {
    name = 'AddTypeForConfig1757094823480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sys_config_type_enum" AS ENUM('string', 'number', 'boolean', 'string[]', 'number[]', 'boolean[]')`);
        await queryRunner.query(`ALTER TABLE "sys_config" ADD "type" "public"."sys_config_type_enum" NOT NULL DEFAULT 'string'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sys_config" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."sys_config_type_enum"`);
    }

}
