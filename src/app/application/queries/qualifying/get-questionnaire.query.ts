import { Injectable } from "@angular/core";
import { BaseQueryHandler } from "../base.query";
import { Failure } from "src/app/domain/error/failure";
import { Questionnaire } from "src/app/domain/models/qualifying/questionnaire";
import { QualifyingRepository } from "src/app/domain/repositories/qualifying.repository";

@Injectable()
export class GetQuestionnaireQuery {
    teacherId!: number;
    courseId!: number;
}

@Injectable()
export class GetQuestionnaireQueryHandler implements BaseQueryHandler<Promise<Questionnaire[]>, GetQuestionnaireQuery>
{
    constructor(private qualifyingRepository: QualifyingRepository) { }

    handle(query: GetQuestionnaireQuery): Promise<Questionnaire[]> {
        return new Promise((resolve, reject) => {
            this.qualifyingRepository.getQuestionnaire(query.teacherId, query.courseId)
                .subscribe({
                    next: (results: Questionnaire[]) => {
                        resolve(results);
                    },
                    error: (e: Failure) => reject(e)
                });
        });
    }
}
