import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user-controller/user-controller';
import { Users } from 'src/entities/Users';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { UserService } from 'src/services/user-service/user-service';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([Users])],   
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UserController);
    }
}
