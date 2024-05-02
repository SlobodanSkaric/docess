import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiReponse } from 'misc/api.resonse';
import { AddAdministratorDto } from 'src/dto/administror/add.adminstrator.dto';
import { GetAdministratorDto } from 'src/dto/administror/get.administrator.dto';
import { Administrators } from 'src/entities/Administrators';
import { Repository } from 'typeorm';
import * as crypto from "crypto";

@Injectable()
export class AdministratorService {
    constructor(@InjectRepository(Administrators) private readonly administrator: Repository<Administrators>){}

    getAdmin(){
        return "This is administrator";
    }

    async getAdminstratroForEmail(email: string): Promise<Administrators | ApiReponse>{
        const checkAdmin = await this.administrator.findOne({ where: { email: email } });
        
        if(!checkAdmin){
            return new ApiReponse("error", -10002, "Incorect email");
        }

        return checkAdmin;
    }

    async createAdministrator(data: AddAdministratorDto): Promise<GetAdministratorDto | ApiReponse >{
        const findAdministrator = await this.administrator.findOne({where: {email: data.email}});

        if(findAdministrator){
           return new ApiReponse("error", -10001, "This email is existed");
        }

        const passwordHashObj = crypto.createHash("SHA512");
        passwordHashObj.update(data.password);
        const passwordHash = passwordHashObj.digest("hex").toLocaleUpperCase();

        const administratorInstance = new Administrators();
        administratorInstance.firstnme = data.firstname;
        administratorInstance.lastname = data.lastname;
        administratorInstance.email = data.email;
        administratorInstance.phonenumber = data.phonenumber;
        administratorInstance.password = passwordHash;

        if(data.status !== null){
            administratorInstance.status = data.status;
        }

        const administratorSave = await this.administrator.save(administratorInstance);

        if(!administratorInstance){
            return null;
        }

        const getAdminstrator = new GetAdministratorDto();
        getAdminstrator.adminId = administratorSave.adminstratorId;
        getAdminstrator.firstname = administratorSave.firstnme;
        getAdminstrator.lastname = administratorSave.lastname;
        getAdminstrator.email = administratorSave.email;

        return getAdminstrator;
    }
}
