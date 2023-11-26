import { Questionnaire } from "src/app/domain/models/qualifying/questionnaire";

export class GetQuestionnaireDto {
    questionNumber!: number;
    sequenceQuestion!: number;
    description!: string;
}

export class GetQuestionnaireDtoTransformer {
    transform(dto: GetQuestionnaireDto[]): Questionnaire[] {
        return dto.map(item => {
            let obj = new Questionnaire();
            obj.questionNumber = item.questionNumber;
            obj.sequenceQuestion = item.sequenceQuestion;
            obj.description = item.description;
            return obj;
        });
    }
}
