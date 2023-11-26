import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class QualifyingService {
    urlGetCourses = `${environment.apiQualifying}/qualifying/courses`;
    urlGetTeachers = `${environment.apiQualifying}/qualifying/teachers`;
    urlGetTeacherDetail = `${environment.apiQualifying}/qualifying/teacher/detail`;
    urlGetQuestionnaire = `${environment.apiQualifying}/qualifying/questionnaire`;
    urlPostQualify = `${environment.apiQualifying}/qualifying/qualify`;
}