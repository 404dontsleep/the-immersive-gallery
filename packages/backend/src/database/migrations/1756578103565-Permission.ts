import { MigrationInterface, QueryRunner } from "typeorm";

export class Permission1756578103565 implements MigrationInterface {
    name = 'Permission1756578103565'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "description" character varying NOT NULL, "canDelete" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_permission" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "granterEmail" character varying, "userId" integer, "permissionId" integer, CONSTRAINT "PK_a7326749e773c740a7104634a77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission_relations" ("parentId" integer NOT NULL, "childId" integer NOT NULL, CONSTRAINT "PK_c466a4f2a6e1a227cf82c9bb5fa" PRIMARY KEY ("parentId", "childId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_41d70e4a92f7dd756037ede1d5" ON "permission_relations" ("parentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7634977a2449dff87877d415ed" ON "permission_relations" ("childId") `);
        await queryRunner.query(`ALTER TABLE "user_permission" ADD CONSTRAINT "FK_deb59c09715314aed1866e18a81" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permission" ADD CONSTRAINT "FK_a592f2df24c9d464afd71401ff6" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permission_relations" ADD CONSTRAINT "FK_41d70e4a92f7dd756037ede1d51" FOREIGN KEY ("parentId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permission_relations" ADD CONSTRAINT "FK_7634977a2449dff87877d415ed7" FOREIGN KEY ("childId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permission_relations" DROP CONSTRAINT "FK_7634977a2449dff87877d415ed7"`);
        await queryRunner.query(`ALTER TABLE "permission_relations" DROP CONSTRAINT "FK_41d70e4a92f7dd756037ede1d51"`);
        await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_a592f2df24c9d464afd71401ff6"`);
        await queryRunner.query(`ALTER TABLE "user_permission" DROP CONSTRAINT "FK_deb59c09715314aed1866e18a81"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7634977a2449dff87877d415ed"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41d70e4a92f7dd756037ede1d5"`);
        await queryRunner.query(`DROP TABLE "permission_relations"`);
        await queryRunner.query(`DROP TABLE "user_permission"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
