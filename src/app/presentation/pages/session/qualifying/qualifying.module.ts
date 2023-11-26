import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/presentation/shared/shared.module';
import { InjectorModule } from './injector.module';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartComponent } from 'src/app/presentation/shared/components/chart/chart.component';

export const routes: Routes = [
  {
    path: 'course',
    component: CourseComponent
  },
  {
    path: 'teacher/:idc',
    component: TeacherComponent
  },
  {
    path: 'teacher-detail/:idt/:idc',
    component: TeacherDetailComponent
  }
]

@NgModule({
  declarations: [
    CourseComponent,
    TeacherComponent,
    TeacherDetailComponent,
    ChartComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    InjectorModule,
    NgApexchartsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class QualifyingModule { }
