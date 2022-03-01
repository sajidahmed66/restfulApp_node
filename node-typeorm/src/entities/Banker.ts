import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Person } from "./utils/Person";
import { Client } from "./Client";

@Entity("banker") // sets the table name
export class Banker extends Person {
  @Column({
    unique: true,
    length: 10,
  })
  employee_number: string;

  @ManyToMany(() => Client)
  @JoinTable({
    name: "banker_client",
    joinColumn: { name: "banker", referencedColumnName: "id" },
    inverseJoinColumn: { name: "client", referencedColumnName: "id" },
  })
  clients: Client[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
