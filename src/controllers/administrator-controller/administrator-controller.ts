import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiReponse } from 'misc/api.resonse';
import { AddAdministratorDto } from 'src/dto/administror/add.adminstrator.dto';
import { GetAdministratorDto } from 'src/dto/administror/get.administrator.dto';
import { AddUserDto } from 'src/dto/user/add.user.dto';
import { Administrators } from 'src/entities/Administrators';
import { Users } from 'src/entities/Users';
import { AdministratorService } from 'src/services/administrator-service/administrator-service';

@Controller('administrator')
export class AdministratorController {
    constructor(private adminstrator: AdministratorService){}

    @Get("")
    getAdminstrator(){
        return this.adminstrator.getAdmin();
    }

    @Put("add")
    addUsers(@Body() data: AddAdministratorDto): Promise<GetAdministratorDto | ApiReponse>{
        return this.adminstrator.createAdministrator(data);
    }
}
