import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiReponse } from 'misc/api.resonse';
import { AddUserDto } from 'src/dto/user/add.user.dto';
import { GetUserDto } from 'src/dto/user/get.user.dto';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as crypto from "crypto";

@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private readonly user: Repository<Users>){}

    getUsers(){
        return "This is users service";
    }

    async createUser(data: AddUserDto): Promise<GetUserDto | ApiReponse>{
        const findUser = await this.user.findOne({where: {email: data.email}});

        if(findUser){
            return new ApiReponse("error", -10001, "This email is existed");
        }

        const passwordHashObj = crypto.createHash("SHA512");
        passwordHashObj.update(data.password);
        const passwordHash = passwordHashObj.digest("hex").toUpperCase();

        const userInstance = new Users();
        userInstance.firstname = data.firstname;
        userInstance.lastname = data.lastname;
        userInstance.email = data.email;
        userInstance.phonenumber = data.phonenumber;
        userInstance.password = passwordHash;
        if(data.status !== null){
            userInstance.status = data.status;
        }


        const userSave = await this.user.save(userInstance);

        if(!userSave){
            return null;
        }

        const getUser = new GetUserDto();
        getUser.userId = userSave.userId;
        getUser.firstname = userSave.firstname;
        getUser.lastname = userSave.lastname;
        getUser.email = userSave.email;

        return getUser;

    }
}
