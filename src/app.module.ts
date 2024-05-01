import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from 'config/dataBaseConfig';
import { AdministratorModuleModule } from './modules/administrator-module/administrator-module.module';
import { UserModuleModule } from './modules/user-module/user-module.module';
import { Administrators } from './entities/Administrators';
import { Users } from './entities/Users';
import { Delivered } from './entities/Delivered';
import { Documentation } from './entities/Documentation';
import { IndividualDocumentation } from './entities/IndividualDocumentation';
import { ManagerToken } from './entities/ManagerToken';
import { UserShifts } from './entities/UserShifts';
import { WorkShifts } from './entities/WorkShifts';

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
    AdministratorModuleModule,
    UserModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
