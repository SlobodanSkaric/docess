import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiReponse } from 'misc/api.resonse';
import { AddUserDto } from 'src/dto/user/add.user.dto';
import { GetUserDto } from 'src/dto/user/get.user.dto';
import { Users } from 'src/entities/Users';
import { UserService } from 'src/services/user-service/user-service';

@Controller('user')
export class UserController {
    constructor(private user: UserService){}

    @Get()
    getUser(){
        return this.user.getUsers();
    }

    @Put("/add")
    addUser(@Body() data: AddUserDto): Promise<GetUserDto | ApiReponse>{
        return this.user.createUser(data);
    }
}
