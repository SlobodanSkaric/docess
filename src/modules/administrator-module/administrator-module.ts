import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministratorController } from 'src/controllers/administrator-controller/administrator-controller';
import { Administrators } from 'src/entities/Administrators';
import { AdministratorService } from 'src/services/administrator-service/administrator-service';

@Module({
    controllers: [AdministratorController],
    providers: [AdministratorService],
    exports:[AdministratorService],
    imports:[TypeOrmModule.forFeature([Administrators])]
})
export class AdministratorModule {}
