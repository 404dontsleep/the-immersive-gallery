import { MigrationInterface, QueryRunner } from "typeorm";

export class AddConfig1756996421316 implements MigrationInterface {
    name = 'AddConfig1756996421316'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sys_config" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLocked" boolean NOT NULL DEFAULT false, "key" character varying NOT NULL, "description" character varying NOT NULL, "value" jsonb NOT NULL, "allowPermission" jsonb NOT NULL DEFAULT '["Root"]', CONSTRAINT "UQ_2c363c25cf99bcaab3a7f389ba6" UNIQUE ("key"), CONSTRAINT "PK_8791cee36df4c4d04a9acffed27" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sys_config"`);
    }

}
