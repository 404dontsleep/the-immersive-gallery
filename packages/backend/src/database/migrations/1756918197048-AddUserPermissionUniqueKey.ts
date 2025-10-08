import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPermissionUniqueKey1756918197048 implements MigrationInterface {
    name = 'AddUserPermissionUniqueKey1756918197048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permission" ADD CONSTRAINT "UQ_1cf6c7f47d0655afa389e1bd594" UNIQUE ("userId", "permissionId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "UQ_1cf6c7f47d0655afa389e1bd594"`);
    }

}
