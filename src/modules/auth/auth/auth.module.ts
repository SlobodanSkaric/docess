import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth/auth/auth.controller';
import { Administrators } from 'src/entities/Administrators';
import { Users } from 'src/entities/Users';
import { AdministratorService } from 'src/services/administrator-service/administrator-service';
import { UserService } from 'src/services/user-service/user-service';

@Module({
    controllers:[AuthController],
    providers:[AdministratorService, UserService],
    imports: [TypeOrmModule.forFeature([Administrators, Users])]
})
export class AuthModule {}
