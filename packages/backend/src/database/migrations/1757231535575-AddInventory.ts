import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInventory1757231535575 implements MigrationInterface {
    name = 'AddInventory1757231535575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "item_type" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLocked" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, "description" character varying NOT NULL, "symbol" character varying NOT NULL, CONSTRAINT "PK_64cde7db02a99c28d4b67efb367" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isLocked" boolean NOT NULL DEFAULT false, "quantity" integer NOT NULL, "expirationDate" date, "userId" integer, "itemTypeId" integer, CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_fe4917e809e078929fe517ab762" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_3db43d51bbdd4dd38c132cf42ad" FOREIGN KEY ("itemTypeId") REFERENCES "item_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_3db43d51bbdd4dd38c132cf42ad"`);
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_fe4917e809e078929fe517ab762"`);
        await queryRunner.query(`DROP TABLE "inventory"`);
        await queryRunner.query(`DROP TABLE "item_type"`);
    }

}
