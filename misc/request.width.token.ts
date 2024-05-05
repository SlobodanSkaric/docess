import { JwtDto } from "src/dto/auth/jwt.dto";

declare module "express"{
    interface Request{
        token: JwtDto;
    }
}