import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserShifts } from "./UserShifts";

@Entity("work_shifts", { schema: "docss" })
export class WorkShifts {
  @PrimaryGeneratedColumn({ type: "int", name: "shifts_id" })
  shiftsId: number;

  @Column("enum", { name: "shift", enum: ["1", "2", "3"] })
  shift: "1" | "2" | "3";

  @OneToMany(() => UserShifts, (userShifts) => userShifts.shift)
  userShifts: UserShifts[];
}
