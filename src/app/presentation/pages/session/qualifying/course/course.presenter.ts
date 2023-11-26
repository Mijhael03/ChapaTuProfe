import { Injectable } from "@angular/core";
import { Course } from "src/app/domain/models/qualifying/course";
import { GetCoursesQuery, GetCoursesQueryHandler } from "src/app/application/queries/qualifying/get-courses.query";

@Injectable()
export class CoursePresenter {

    isToastOpen: boolean = false;
    isLoadingOpen: boolean = false;
    messageToast: string = "";

    coursesList: Course[] = [];
    coursesFilter: Course[] = [];

    constructor(private getCoursesQuery: GetCoursesQuery, private getCoursesQueryHandler: GetCoursesQueryHandler) { }

    async getCourses(studentId: number, careerId: number) {
        this.coursesList = [];
        this.getCoursesQuery.studentId = studentId;
        this.getCoursesQuery.careerId = careerId;
        await this.getCoursesQueryHandler.handle(this.getCoursesQuery).then((result) => {
            this.coursesList = result;
        }).catch((error) => {
            this.setOpenToast(true, 'Por favor volver a intentar nuevamente');
        });
    }

    setOpenToast(isOpen: boolean, message: string = "") {
        this.isToastOpen = isOpen;
        this.messageToast = message;
    }
}
