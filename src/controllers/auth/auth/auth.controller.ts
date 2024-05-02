import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth/auth.dto';
import { AdministratorService } from 'src/services/administrator-service/administrator-service';
import { UserService } from 'src/services/user-service/user-service';
import { Request } from 'express';
import { LoginInfoDto } from 'src/dto/auth/login.info.dto';
import { ApiReponse } from 'misc/api.resonse';
import { JwtDto } from 'src/dto/auth/jwt.dto';
import * as jwt from "jsonwebtoken";
import { jwtSicret } from 'config/jwt.sicret';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly adminstrator: AdministratorService,
        private readonly user: UserService
    ){}

    @Post("login/user")
    async userLogin(@Body() data: AuthDto, @Req() req: Request): Promise<LoginInfoDto | ApiReponse>{
        const getUser = await this.user.getUserForEmail(data.email);

        if(getUser === null){
            return new ApiReponse("error", -10003, "Invalid email");
        }

        const checkedPassword = await this.user.checkPassword(data.email, data.password);

        if(!checkedPassword){
            return new ApiReponse("error", -10004, "Incorect password");
        }

        const jwtData = new JwtDto();

        jwtData.id = getUser.userId;
        jwtData.identity = getUser.email;
        jwtData.role = "user";
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];
        jwtData.exp = this.setTokenDateExpire(60 * 5);

        const token = jwt.sign(jwtData.toPlainObject(), jwtSicret);

        return new LoginInfoDto(getUser.userId, getUser.email, token);
    }


    @Post("login/admin")
    async adminstratorLogin(@Body() data: AuthDto, @Req() req: Request){
        const getAdmin = await this.adminstrator.getAdminstratroForEmail(data.email);

        if(getAdmin === null){
            return new ApiReponse("error", -10003, "Invalid email");
        }

        const checkedPassword = await this.adminstrator.checkPassword(data.email, data.password);

        if(!checkedPassword){
            return new ApiReponse("error", -10004, "Incorect password");
        }

        const jwtData = new JwtDto();

        jwtData.id = getAdmin.adminstratorId;
        jwtData.identity = getAdmin.email;
        jwtData.role = "administrator";
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers["user-agent"];
        jwtData.exp = this.setTokenDateExpire(60 * 5);

        const token = jwt.sign(jwtData.toPlainObject(), jwtSicret);

        return new LoginInfoDto(getAdmin.adminstratorId, getAdmin.email, token);
    }

    private setTokenDateExpire(numberofSeconds: number){
        const curentDate = new Date();
        const expireTime = curentDate.getTime() / 1000 + numberofSeconds;

        return expireTime;
    }
}
