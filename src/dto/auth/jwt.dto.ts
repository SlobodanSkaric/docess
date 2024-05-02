export class JwtDto{
    id: number;
    identity: string;
    role: "administrator" | "user";
    ip: string;
    ua: string;
    exp: number;

    toPlainObject(){
        return {
            id: this.id,
            identity: this.identity,
            role: this.role,
            ip: this.ip,
            ua: this.ua,
            exp: this.exp
        }
    }
}