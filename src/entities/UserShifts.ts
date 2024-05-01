import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { WorkShifts } from "./WorkShifts";
import { Users } from "./Users";

@Index("fk_work_shifts_users_user_id", ["userId"], {})
@Index("fk_work_shifts_administrators_shift_id", ["shiftId"], {})
@Entity("user_shifts", { schema: "docss" })
export class UserShifts {
  @PrimaryGeneratedColumn({ type: "int", name: "user_shift_id" })
  userShiftId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "shift_id" })
  shiftId: number;

  @ManyToOne(() => WorkShifts, (workShifts) => workShifts.userShifts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "shift_id", referencedColumnName: "shiftsId" }])
  shift: WorkShifts;

  @ManyToOne(() => Users, (users) => users.userShifts, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
