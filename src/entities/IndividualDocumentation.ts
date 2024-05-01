import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Administrators } from "./Administrators";

@Index(
  "fk_induvidual_documentation_administratro_administrator_id",
  ["administratorId"],
  {}
)
@Entity("individual_documentation", { schema: "docss" })
export class IndividualDocumentation {
  @PrimaryGeneratedColumn({ type: "int", name: "individual_documentation_id" })
  individualDocumentationId: number;

  @Column("int", { name: "administrator_id", default: () => "'0'" })
  administratorId: number;

  @Column("timestamp", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @Column("int", { name: "123456", default: () => "'0'" })
  123456: number;

  @Column("int", { name: "654321", default: () => "'0'" })
  654321: number;

  @ManyToOne(
    () => Administrators,
    (administrators) => administrators.individualDocumentations,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "administrator_id", referencedColumnName: "adminstratorId" },
  ])
  administrator: Administrators;
}
