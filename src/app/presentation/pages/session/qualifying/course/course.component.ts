import { Component, OnInit } from '@angular/core';
import { CoursePresenter } from './course.presenter';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [CoursePresenter]
})
export class CourseComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
