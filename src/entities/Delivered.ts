import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Documentation } from "./Documentation";
import { Users } from "./Users";

@Index("fk_delivered_user_user_id", ["userId"], {})
@Index("fk_delivered_docemnetation_documentation_id", ["documentationId"], {})
@Entity("delivered", { schema: "docss" })
export class Delivered {
  @PrimaryGeneratedColumn({ type: "int", name: "delivered_id" })
  deliveredId: number;

  @Column("int", { name: "user_id", default: () => "'0'" })
  userId: number;

  @Column("enum", { name: "work_shift", enum: ["1", "2", "3"] })
  workShift: "1" | "2" | "3";

  @Column("int", { name: "documentation_id", default: () => "'0'" })
  documentationId: number;

  @Column("timestamp", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @ManyToOne(() => Documentation, (documentation) => documentation.delivereds, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "documentation_id", referencedColumnName: "documentationId" },
  ])
  documentation: Documentation;

  @ManyToOne(() => Users, (users) => users.delivereds, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
