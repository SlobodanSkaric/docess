import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IndividualDocumentation } from "./IndividualDocumentation";

@Entity("administrators", { schema: "docss" })
export class Administrators {
  @PrimaryGeneratedColumn({ type: "int", name: "adminstrator_id" })
  adminstratorId: number;

  @Column("varchar", { name: "firstnme", length: 50, default: () => "'0'" })
  firstnme: string;

  @Column("varchar", { name: "lastname", length: 50, default: () => "'0'" })
  lastname: string;

  @Column("varchar", { name: "email", length: 50, default: () => "'0'" })
  email: string;

  @Column("varchar", { name: "phonenumber", length: 50, default: () => "'0'" })
  phonenumber: string;

  @Column("varchar", { name: "status", length: 50, default: () => "'0'" })
  status: string;

  @Column("timestamp", {
    name: "data_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dataCreate: Date;

  @OneToMany(
    () => IndividualDocumentation,
    (individualDocumentation) => individualDocumentation.administrator
  )
  individualDocumentations: IndividualDocumentation[];
}
