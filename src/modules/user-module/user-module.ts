import { Module } from '@nestjs/common';
import { UserController } from 'src/controllers/user-controller/user-controller';
import { UserService } from 'src/services/user-service/user-service';

@Module({
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}