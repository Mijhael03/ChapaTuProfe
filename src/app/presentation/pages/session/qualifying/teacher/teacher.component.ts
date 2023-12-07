import { Component, OnInit } from '@angular/core';
import { TeacherPresenter } from './teacher.presenter';
import { ActivatedRoute, Router } from '@angular/router';
import { Teacher } from 'src/app/domain/models/qualifying/teacher';
import { AuthService } from 'src/app/presentation/shared/services/auth.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [TeacherPresenter]
})
export class TeacherComponent implements OnInit {

  courseId: number = 0;
  courseName: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    public presenter: TeacherPresenter,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.params['idc'];
    await this.presenter.getTeachers(this.courseId).then(() => {
      this.presenter.teacherFilter = [...this.presenter.teacherList];
      this.courseName = this.presenter.teacherList[0].courseName;
      this.presenter.teacherFilter.map(x => x.photo = `assets/images/${x.photo}`);
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.presenter.teacherFilter = this.presenter.teacherList.filter((d) => d.name.toLowerCase().indexOf(query) > -1);
  }

  evReturn() {
    this.router.navigate(["/qualifying/course"]);
  }

  evLogout() {
    this.authService.signOut();
    this.router.navigate(["/auth/login"]);
  }

  evSelectRow(row: Teacher) {
    this.router.navigate(["/qualifying/teacher-detail", row.teacherId, this.courseId]);
  }
}
