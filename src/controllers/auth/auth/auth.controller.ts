import { Controller, Post } from '@nestjs/common';
import { AdministratorService } from 'src/services/administrator-service/administrator-service';
import { UserService } from 'src/services/user-service/user-service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly adminstrator: AdministratorService,
        private readonly user: UserService
    ){}

    @Post("login/user")
    userLogin(){
        
    }

    @Post("login/admin")
    adminstratorLogin(){

    }
}
