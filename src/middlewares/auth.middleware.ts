import { HttpException, HttpStatus, NestMiddleware } from "@nestjs/common";
import { AdministratorService } from "src/services/administrator-service/administrator-service";
import { UserService } from "src/services/user-service/user-service";
import { NextFunction, Request, Response } from "express";
import { JwtDto } from "src/dto/auth/jwt.dto";
import * as jwt from "jsonwebtoken";
import { jwtSicret } from "config/jwt.sicret";


export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly adminstrator: AdministratorService,
        private readonly user: UserService 
    ){}

    async use(request: Request, response: Response, next: NextFunction) {
        if(!request.headers.authorization){
            throw new HttpException("Token not valid", HttpStatus.UNAUTHORIZED);
        }

        const requestToken = request.headers.authorization;
        const splitToken = requestToken.split(" ")[1];
        
        let jwtData: JwtDto;

        try{
            jwtData = jwt.verify(splitToken, jwtSicret);
        }catch{
            throw new HttpException("Token not valid (sign)", HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ip !== request.ip.toString()){
            throw new HttpException("Token not valid (ip)", HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ua !== request.headers["user-agent"]){
            throw new HttpException("Token not valid (ua)", HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.role === "administrator"){
            let administratorId = jwtData.id;
            let checkAdminstartor;
            try{
                checkAdminstartor = await this.user.getUserForId(administratorId);
            }catch(e){
                console.log("Error: " + e);
            }
            

            if(checkAdminstartor === null){
                throw new HttpException("Token not valid (user)", HttpStatus.UNAUTHORIZED);
            }
        }

        if(jwtData.role === "user"){
            let userId = jwtData.id;
            let checkUser;
            try{
                checkUser = await this.user.getUserForId(userId);
            }catch(e){
                console.log("Error: " + e);
            }
            

            if(checkUser === null){
                throw new HttpException("Token not valid (user)", HttpStatus.UNAUTHORIZED);
            }
        }

        const curentTimeStamp = new Date().getTime() / 1000;
        
        if(curentTimeStamp >= jwtData.exp){
            throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
        }
        request.token = jwtData;
        next();
    }

}