import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Delivered } from "./Delivered";
import { Users } from "./Users";

@Index("fk_documentation_user_user_id", ["userId"], {})
@Entity("documentation", { schema: "docss" })
export class Documentation {
  @PrimaryGeneratedColumn({ type: "int", name: "documentation_id" })
  documentationId: number;

  @Column("int", { name: "user_id", default: () => "'0'" })
  userId: number;

  @Column("int", { name: "documentation_number", default: () => "'0'" })
  documentationNumber: number;

  @Column("enum", { name: "work_shift", enum: ["1", "2", "3"] })
  workShift: "1" | "2" | "3";

  @Column("timestamp", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @OneToMany(() => Delivered, (delivered) => delivered.documentation)
  delivereds: Delivered[];

  @ManyToOne(() => Users, (users) => users.documentations, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
