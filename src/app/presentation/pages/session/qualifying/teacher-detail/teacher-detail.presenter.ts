import { Injectable } from "@angular/core";
import { Questionnaire } from "src/app/domain/models/qualifying/questionnaire";
import { TeacherDetail } from "src/app/domain/models/qualifying/teacher-detail";
import { GetQuestionnaireQuery, GetQuestionnaireQueryHandler } from "src/app/application/queries/qualifying/get-questionnaire.query";
import { GetTeacherDetailQuery, GetTeacherDetailQueryHandler } from "src/app/application/queries/qualifying/get-teacher-detail.query";
import { QualifyCommand, QualifyCommandHandler } from "src/app/application/commands/qualifying/qualify.command";
import { ActionResponseDto } from "src/app/domain/dto/action-response.dto";
import { QualifyDto } from "src/app/domain/dto/qualifying/qualify.dto";

@Injectable()
export class TeacherDetailPresenter {

    isToastOpen: boolean = false;
    isLoadingOpen: boolean = false;
    messageToast: string = "";

    teacherDetailList: TeacherDetail[] = [];
    questionnaireList: Questionnaire[] = [];

    questionnaireResponse = new ActionResponseDto();

    constructor(
        private getTeacherDetailQuery: GetTeacherDetailQuery, private getTeacherDetailQueryHandler: GetTeacherDetailQueryHandler,
        private getQuestionnaireQuery: GetQuestionnaireQuery, private getQuestionnaireQueryHandler: GetQuestionnaireQueryHandler,
        private qualifyCommand: QualifyCommand, private qualifyCommandHandler: QualifyCommandHandler,
    ) { }

    async getTeacherDetail(teacherId: number, courseId: number) {
        this.teacherDetailList = [];
        this.getTeacherDetailQuery.teacherId = teacherId;
        this.getTeacherDetailQuery.courseId = courseId;
        await this.getTeacherDetailQueryHandler.handle(this.getTeacherDetailQuery).then((result) => {
            this.teacherDetailList = result;
        }).catch((error) => {
            this.setOpenToast(true, 'Por favor volver a intentar nuevamente');
        });
    }

    async getQuestionnaire(teacherId: number, courseId: number) {
        this.questionnaireList = [];
        this.getQuestionnaireQuery.teacherId = teacherId;
        this.getQuestionnaireQuery.courseId = courseId;
        await this.getQuestionnaireQueryHandler.handle(this.getQuestionnaireQuery).then((result) => {
            this.questionnaireList = result;
        }).catch((error) => {
            this.setOpenToast(true, 'Por favor volver a intentar nuevamente');
        });
    }

    async postQuestionnaire(request: QualifyDto) {
        this.isLoadingOpen = true;
        this.questionnaireResponse = new ActionResponseDto();
        this.qualifyCommand.request = request;
        await this.qualifyCommandHandler.handle(this.qualifyCommand).then((result) => {
            this.isLoadingOpen = false;
            this.questionnaireResponse = result;
        }).catch((error) => {
            this.isLoadingOpen = false;
            this.setOpenToast(true, 'Por favor volver a intentar nuevamente');
        });
    }

    setOpenToast(isOpen: boolean, message: string = "") {
        this.isToastOpen = isOpen;
        this.messageToast = message;
    }
}
