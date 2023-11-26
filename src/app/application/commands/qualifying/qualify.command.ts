import { Injectable } from "@angular/core";
import { BaseCommandHandler } from "../base.handler";
import { Failure } from "src/app/domain/error/failure";
import { QualifyDto } from "src/app/domain/dto/qualifying/qualify.dto";
import { ActionResponseDto } from "src/app/domain/dto/action-response.dto";
import { QualifyingRepository } from "src/app/domain/repositories/qualifying.repository";


@Injectable()
export class QualifyCommand {
    request!: QualifyDto;
}

@Injectable()
export class QualifyCommandHandler implements BaseCommandHandler<Promise<ActionResponseDto>, QualifyCommand>{

    constructor(private qualifyingRepository: QualifyingRepository) { }

    handle(command: QualifyCommand): Promise<ActionResponseDto> {
        return new Promise((resolve, reject) => {
            this.qualifyingRepository.qualify(command.request)
                .subscribe((result: ActionResponseDto) => {
                    resolve(result)
                }, (error: Failure) => {
                    reject(error);
                })
        })
    }
}