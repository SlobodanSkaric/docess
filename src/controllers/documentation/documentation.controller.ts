import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiReponse } from 'misc/api.resonse';
import { DocumentationDto } from 'src/dto/documentation/documentation.dto';
import { Documentation } from 'src/entities/Documentation';
import { DocumentationService } from 'src/services/documentation/documentation.service';

@Controller('api/documentation')
export class DocumentationController {
    constructor(private readonly documentation: DocumentationService){}

    @Get("all")
    async getAllDocumentation(){
        return await this.documentation.getAll();
    }

    @Get("user/:userId")
    async getForUserId(@Param("userId") id: number): Promise<Documentation[] | null>{
       return await this.documentation.getForUser(id);
    }

    @Get(":documentationNumber")
    async getDocumentationForNumber(@Param("documentationNumber") documentationNumber: string): Promise<Documentation | null>{
        return await this.documentation.getForNumber(documentationNumber);
    }

    @Get("workshift/:workShift")
    async getDocumentationForWorkShift(@Param("workShift") workShift: "1" | "2" | "3"): Promise<Documentation[] | null>{
        return await this.documentation.getWorkShift(workShift);
    }

    @Put("save")
    async saveDocumentation(@Body() data: DocumentationDto): Promise<Documentation | ApiReponse>{
        return await this.documentation.documentationSava(data);
    } 
}
