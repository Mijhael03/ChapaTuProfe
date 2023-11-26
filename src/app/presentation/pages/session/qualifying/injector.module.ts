import { NgModule } from '@angular/core';
import { QualifyCommand, QualifyCommandHandler } from 'src/app/application/commands/qualifying/qualify.command';
import { GetCoursesQuery, GetCoursesQueryHandler } from 'src/app/application/queries/qualifying/get-courses.query';
import { GetQuestionnaireQuery, GetQuestionnaireQueryHandler } from 'src/app/application/queries/qualifying/get-questionnaire.query';
import { GetTeacherDetailQuery, GetTeacherDetailQueryHandler } from 'src/app/application/queries/qualifying/get-teacher-detail.query';
import { GetTeachersQuery, GetTeachersQueryHandler } from 'src/app/application/queries/qualifying/get-teachers.query';
import { QualifyingRepository } from 'src/app/domain/repositories/qualifying.repository';
import { QualifyingRepositoryImpl } from 'src/app/infrastructure/qualifying.repository';

@NgModule({
  imports: [],
  providers: [
    { provide: QualifyingRepository, useClass: QualifyingRepositoryImpl },
    GetCoursesQuery,
    GetCoursesQueryHandler,
    GetTeachersQuery,
    GetTeachersQueryHandler,
    GetTeacherDetailQuery,
    GetTeacherDetailQueryHandler,
    GetQuestionnaireQuery,
    GetQuestionnaireQueryHandler,
    QualifyCommand,
    QualifyCommandHandler
  ]
})
export class InjectorModule { }
