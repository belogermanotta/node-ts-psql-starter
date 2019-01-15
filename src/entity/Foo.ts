import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Foo {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
}