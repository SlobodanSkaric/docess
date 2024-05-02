import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user-controller/user-controller';
import { Users } from 'src/entities/Users';
import { UserService } from 'src/services/user-service/user-service';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([Users])]
})
export class UserModule {}
