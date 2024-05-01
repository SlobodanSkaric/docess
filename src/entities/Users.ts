import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Delivered } from "./Delivered";
import { Documentation } from "./Documentation";
import { ManagerToken } from "./ManagerToken";
import { UserShifts } from "./UserShifts";

@Entity("users", { schema: "docss" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("varchar", { name: "firstname", length: 50, default: () => "'0'" })
  firstname: string;

  @Column("varchar", { name: "lastname", length: 50, default: () => "'0'" })
  lastname: string;

  @Column("varchar", { name: "email", length: 125, default: () => "'0'" })
  email: string;

  @Column("varchar", { name: "phonenumber", length: 125, default: () => "'0'" })
  phonenumber: string;

  @Column("tinyint", { name: "status", width: 1, default: () => "'1'" })
  status: boolean;

  @Column("timestamp", {
    name: "date_create",
    default: () => "CURRENT_TIMESTAMP",
  })
  dateCreate: Date;

  @OneToMany(() => Delivered, (delivered) => delivered.user)
  delivereds: Delivered[];

  @OneToMany(() => Documentation, (documentation) => documentation.user)
  documentations: Documentation[];

  @OneToMany(() => ManagerToken, (managerToken) => managerToken.user)
  managerTokens: ManagerToken[];

  @OneToMany(() => UserShifts, (userShifts) => userShifts.user)
  userShifts: UserShifts[];
}
