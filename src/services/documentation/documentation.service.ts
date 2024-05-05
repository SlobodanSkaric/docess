import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiReponse } from 'misc/api.resonse';
import { DocumentationDto } from 'src/dto/documentation/documentation.dto';
import { Documentation } from 'src/entities/Documentation';
import { Users } from 'src/entities/Users';

import { Repository } from 'typeorm';
//How return return select data
@Injectable()
export class DocumentationService {
    constructor(
        @InjectRepository(Documentation) private readonly documentation: Repository<Documentation>,
        @InjectRepository(Users) private readonly user: Repository<Users>
    ){}

    async getAll(): Promise<Documentation[]>{
        const documentationResult = await this.documentation.createQueryBuilder("documentation").leftJoinAndSelect("documentation.user", "user")
                                                            .select(["documentation", "user.firstname", "user.lastname", "user.email"])
                                                            .getMany();

        return documentationResult;
    }

    async getForNumber(documentationNumber: string): Promise<Documentation[] | null>{
        const documentationResul = await this.documentation.createQueryBuilder("documentation").leftJoinAndSelect("documentation.user","user")
                                                           .where("documentation.documentationNumber = :docNum", {docNum: documentationNumber})
                                                           .select(["documentation", "user.firstname", "user.lastname", "user.email"])
                                                           .getMany();

       
        if(!documentationResul){
            return null;
        }

        return documentationResul;
    }

    async getForUser(userId: number): Promise<Documentation[] | null>{
        const documentationResul = await this.documentation.createQueryBuilder("documentation").leftJoinAndSelect("documentation.user","user")
                                                           .where("documentation.userId = :userId", {userId: userId})
                                                           .select(["documentation", "user.firstname", "user.lastname", "user.email"])
                                                           .getMany();

       
        if(!documentationResul){
            return null;
        }

        return documentationResul;
    }

    async getWorkShift(workShift: "1"|"2"|"3"):Promise<Documentation[] | null>{
        const documentationResul = await this.documentation.createQueryBuilder("documentation").leftJoinAndSelect("documentation.user","user")
                                                           .where("documentation.workShift = :workShift", {workShift: workShift})
                                                           .select(["documentation", "user.firstname", "user.lastname", "user.email"])
                                                           .getMany();

       
        if(!documentationResul){
            return null;
        }

        return documentationResul;
    }

    async documentationSava(data: DocumentationDto): Promise<Documentation | ApiReponse>{
        const usersChecked = await this.user.findOne({ where: { userId: data.userId } });
        const documentationNumber = await this.documentation.findOne({ where: { documentationNumber: data.documentationNumber } });

        if(!usersChecked){
            return new ApiReponse("error", -10007, "User not existe");
        }

        if(documentationNumber){
            return new ApiReponse("error", -10007, "This documentation number must existe");
        }

        const documentationInstance = new Documentation();

        documentationInstance.userId = data.userId;
        documentationInstance.documentationNumber = data.documentationNumber;
        documentationInstance.workShift = data.workShift;

        const documentationInstanceSave = await this.documentation.save(documentationInstance);

        if(!documentationInstanceSave){
            return new ApiReponse("error", -10006, "No valid save");
        }

        return documentationInstanceSave;  
    }
}
