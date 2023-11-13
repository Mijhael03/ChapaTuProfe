import { Component, OnInit } from '@angular/core';
import { TeacherDetailPresenter } from './teacher-detail.presenter';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
  providers: [TeacherDetailPresenter]
})
export class TeacherDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
