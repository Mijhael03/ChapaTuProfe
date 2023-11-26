import { Injectable } from "@angular/core";
import { QualifyingRepository } from "../domain/repositories/qualifying.repository";
import { ApiService } from "./remote/api.service";
import { Observable, map } from "rxjs";
import { Course } from "../domain/models/qualifying/course";
import { QualifyingService } from "./remote/qualifying.service";
import { GetCoursesDto, GetCoursesDtoTransformer } from "./dto/qualifying/get-courses.dto";
import { Teacher } from "../domain/models/qualifying/teacher";
import { TeacherDetail } from "../domain/models/qualifying/teacher-detail";
import { Questionnaire } from "../domain/models/qualifying/questionnaire";
import { GetQuestionnaireDto, GetQuestionnaireDtoTransformer } from "./dto/qualifying/get-questionnaire.dto";
import { GetTeacherDetailDto, GetTeacherDetailDtoTransformer } from "./dto/qualifying/get-teacher-detail";
import { GetTeachersDto, GetTeachersDtoTransformer } from "./dto/qualifying/get-teachers.dto";
import { AuthService } from "../presentation/shared/services/auth.service";
import { QualifyDto } from "../domain/dto/qualifying/qualify.dto";
import { ActionResponseDto } from "../domain/dto/action-response.dto";
import { GetActionResponseDto, GetActionResponseDtoTransformer } from "./dto/action-response.dto";

@Injectable()
export class QualifyingRepositoryImpl implements QualifyingRepository {

    constructor(private apiService: ApiService, private qualifyingApiService: QualifyingService, private authService: AuthService) { }

    getCourses(studentId: number, careerId: number): Observable<Course[]> {
        return this.apiService
            .get(this.qualifyingApiService.urlGetCourses, { studentId: studentId, careerId: careerId })
            .pipe(
                map((dto: GetCoursesDto[]) => new GetCoursesDtoTransformer().transform(dto))
            );
    }

    getTeachers(courseId: number): Observable<Teacher[]> {
        return this.apiService
            .get(this.qualifyingApiService.urlGetTeachers, { courseId: courseId })
            .pipe(
                map((dto: GetTeachersDto[]) => new GetTeachersDtoTransformer().transform(dto))
            );
    }

    getTeacherDetail(teacherId: number, courseId: number): Observable<TeacherDetail[]> {
        return this.apiService
            .get(this.qualifyingApiService.urlGetTeacherDetail, { teacherId: teacherId, courseId: courseId })
            .pipe(
                map((dto: GetTeacherDetailDto[]) => new GetTeacherDetailDtoTransformer().transform(dto))
            );
    }

    getQuestionnaire(teacherId: number, courseId: number): Observable<Questionnaire[]> {
        return this.apiService
            .get(this.qualifyingApiService.urlGetQuestionnaire, { StudentId: this.authService.getUser().userId, TeacherId: teacherId, CourseId: courseId, CycleNumber: this.authService.getUser().cycleNumber })
            .pipe(
                map((dto: GetQuestionnaireDto[]) => new GetQuestionnaireDtoTransformer().transform(dto))
            );
    }

    qualify(request: QualifyDto): Observable<ActionResponseDto> {
        return this.apiService
            .post(this.qualifyingApiService.urlPostQualify, {
                StudentId: this.authService.getUser().userId,
                TeacherId: request.teacherId,
                CourseId: request.courseId,
                CareerId: this.authService.getUser().careerId,
                CycleNumber: this.authService.getUser().cycleNumber,
                QualificationTotal: request.qualificationTotal,
                QuestionScoreAverage: request.questionScoreAverage,
                User: this.authService.getUser().code,
                Detail: request.detail.map(item => {
                    return {
                        QuestionNumber: item.questionNumber,
                        QuestionSequence: item.sequenceQuestion,
                        Score: item.score
                    }
                })
            })
            .pipe(
                map((dto: GetActionResponseDto) => new GetActionResponseDtoTransformer().transform(dto)))
    }
}