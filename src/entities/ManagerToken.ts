import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("fk_manager_token_user_user_id", ["userId"], {})
@Entity("manager_token", { schema: "docss" })
export class ManagerToken {
  @PrimaryGeneratedColumn({ type: "int", name: "manager_token_id" })
  managerTokenId: number;

  @Column("int", { name: "user_id", default: () => "'0'" })
  userId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("text", { name: "token" })
  token: string;

  @Column("datetime", { name: "expiries_at" })
  expiriesAt: Date;

  @Column("tinyint", { name: "is_valid", default: () => "'1'" })
  isValid: number;

  @ManyToOne(() => Users, (users) => users.managerTokens, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
