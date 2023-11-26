import { Injectable } from "@angular/core";
import { Teacher } from "src/app/domain/models/qualifying/teacher";
import { GetTeachersQuery, GetTeachersQueryHandler } from "src/app/application/queries/qualifying/get-teachers.query";

@Injectable()
export class TeacherPresenter {

    isToastOpen: boolean = false;
    isLoadingOpen: boolean = false;
    messageToast: string = "";

    teacherList: Teacher[] = [];
    teacherFilter: Teacher[] = [];

    constructor(
        private getTeachersQuery: GetTeachersQuery, private getTeachersQueryHandler: GetTeachersQueryHandler,
    ) { }

    async getTeachers(courseId: number) {
        this.teacherList = [];
        this.getTeachersQuery.courseId = courseId;
        await this.getTeachersQueryHandler.handle(this.getTeachersQuery).then((result) => {
            this.teacherList = result;
        }).catch((error) => {
            this.setOpenToast(true, 'Por favor volver a intentar nuevamente');
        });
    }

    setOpenToast(isOpen: boolean, message: string = "") {
        this.isToastOpen = isOpen;
        this.messageToast = message;
    }
}
