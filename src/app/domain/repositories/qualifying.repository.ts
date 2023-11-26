import { Observable } from "rxjs";
import { Course } from "../models/qualifying/course";
import { Teacher } from "../models/qualifying/teacher";
import { TeacherDetail } from "../models/qualifying/teacher-detail";
import { Questionnaire } from "../models/qualifying/questionnaire";
import { ActionResponseDto } from "../dto/action-response.dto";
import { QualifyDto } from "../dto/qualifying/qualify.dto";


export abstract class QualifyingRepository {
    getCourses!: (studentId: number, careerId: number) => Observable<Course[]>;
    getTeachers!: (courseId: number) => Observable<Teacher[]>;
    getTeacherDetail!: (teacherId: number, courseId: number) => Observable<TeacherDetail[]>;
    getQuestionnaire!: (teacherId: number, courseId: number) => Observable<Questionnaire[]>;
    qualify!: (request: QualifyDto) => Observable<ActionResponseDto>;
}