import { Component, OnInit } from '@angular/core';
import { TeacherPresenter } from './teacher.presenter';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
  providers: [TeacherPresenter]
})
export class TeacherComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
