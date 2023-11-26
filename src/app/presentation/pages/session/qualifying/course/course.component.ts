import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CoursePresenter } from './course.presenter';
import { Course } from 'src/app/domain/models/qualifying/course';
import { AuthService } from 'src/app/presentation/shared/services/auth.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [CoursePresenter]
})
export class CourseComponent implements OnInit {

  user: string = '';
  userMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    public presenter: CoursePresenter,
  ) { }

  async ngOnInit() {
    this.user = this.authService.getUser().name;
    this.userMessage = `¡Hola, ${this.user}!`;
    await this.presenter.getCourses(this.authService.getUser().userId, this.authService.getUser().careerId)
      .then(() => this.presenter.coursesFilter = [...this.presenter.coursesList]);
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.presenter.coursesFilter = this.presenter.coursesList.filter((d) => d.description.toLowerCase().indexOf(query) > -1);
  }

  evSelectRow(row: Course) {
    this.router.navigate(["/qualifying/teacher", row.courseId]);
  }

  evLogout() {
    this.router.navigate(["/auth/login"]);
    this.authService.signOut();
  }
}
