import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth/auth/auth.controller';
import { AdministratorService } from 'src/services/administrator-service/administrator-service';
import { UserService } from 'src/services/user-service/user-service';

@Module({
    controllers:[AuthController],
    providers:[AdministratorService, UserService],
    imports: [TypeOrmModule.forFeature([AdministratorService, UserService])]
})
export class AuthModule {}
