import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentationController } from 'src/controllers/documentation/documentation.controller';
import { Documentation } from 'src/entities/Documentation';
import { Users } from 'src/entities/Users';
import { DocumentationService } from 'src/services/documentation/documentation.service';

@Module({
    controllers: [DocumentationController],
    providers: [DocumentationService],
    imports: [TypeOrmModule.forFeature([Documentation,Users])]
})
export class DocumentationModule {}
