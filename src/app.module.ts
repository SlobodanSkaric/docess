import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/dataBaseConfig';
import { AdministratorModule } from './modules/administrator-module/administrator-module';
import { UserModule } from './modules/user-module/user-module';
import { Administrators } from './entities/Administrators';
import { Users } from './entities/Users';
import { Delivered } from './entities/Delivered';
import { Documentation } from './entities/Documentation';
import { IndividualDocumentation } from './entities/IndividualDocumentation';
import { ManagerToken } from './entities/ManagerToken';
import { UserShifts } from './entities/UserShifts';
import { WorkShifts } from './entities/WorkShifts';
import { AuthModule } from './modules/auth/auth/auth.module';
import { DocumentationController } from './controllers/documentation/documentation.controller';
import { DocumentationModule } from './modules/documentation/documentation.module';
import { DocumentationService } from './services/documentation/documentation.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: DatabaseConfiguration.host,
      port: 3306,
      username: DatabaseConfiguration.username,
      password: DatabaseConfiguration.password,
      database: DatabaseConfiguration.dbname,
      entities:[
        Administrators,
        Users,
        Delivered,
        Documentation,
        IndividualDocumentation,
        ManagerToken,
        UserShifts,
        WorkShifts
      ],
    }),
    TypeOrmModule.forFeature([
        Administrators,
        Users,
        Delivered,
        Documentation,
        IndividualDocumentation,
        ManagerToken,
        UserShifts,
        WorkShifts
    ]),
    AdministratorModule,
    UserModule,
    AuthModule,
    DocumentationModule,
  ],
  controllers: [DocumentationController],
  providers: [DocumentationService],
 /*  controllers: [AppController, AuthController],
  providers: [AppService], */
})
export class AppModule {}
