import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Foo1529636932778 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        console.log("testt");
        await queryRunner.createTable(new Table({
            name: "foos",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("foos");
    }

}
