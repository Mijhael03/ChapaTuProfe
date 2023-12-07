import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherDetailPresenter } from './teacher-detail.presenter';
import { AuthService } from 'src/app/presentation/shared/services/auth.service';
import { RangeCustomEvent } from '@ionic/angular';
import { QualifyDto } from 'src/app/domain/dto/qualifying/qualify.dto';
import { Questionnaire } from 'src/app/domain/models/qualifying/questionnaire';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
  providers: [TeacherDetailPresenter]
})
export class TeacherDetailComponent implements OnInit {

  teacherId: number = 0;
  courseId: number = 0;
  courseName: string = '';
  teacherCodeName: string = '';
  qualificationAverage: number = 0.0;
  qualificationQuantity: number = 0.0;
  messageQualification: string = '';
  teacherPhoto: string = '';
  visibleButton: boolean = false;
  visibleChart: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public presenter: TeacherDetailPresenter,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.visibleChart = false;
    this.teacherId = this.activatedRoute.snapshot.params['idt'];
    this.courseId = this.activatedRoute.snapshot.params['idc'];
    await this.presenter.getTeacherDetail(this.teacherId, this.courseId).then(() => {
      if (this.presenter.teacherDetailList.length > 0) {
        this.courseName = this.presenter.teacherDetailList[0].courseName;
        this.teacherCodeName = this.presenter.teacherDetailList[0].teacherCodeName;
        this.qualificationAverage = this.presenter.teacherDetailList[0].qualificationAverage;
        this.qualificationQuantity = this.presenter.teacherDetailList[0].qualificationQuantity;
      }
      this.messageQualification = this.qualificationQuantity === 0 ? `(Sin calificación)` :
        this.qualificationQuantity === 1 ? `(${this.qualificationQuantity} calificación)` :
          `(${this.qualificationQuantity} calificaciones)`;
      this.visibleChart = this.qualificationQuantity > 0;
      this.teacherPhoto = `assets/images/${this.presenter.teacherDetailList[0].teacherPhoto}`;
    });
    await this.presenter.getQuestionnaire(this.teacherId, this.courseId).then(() => {
      if (this.presenter.questionnaireList.length > 0) {
        this.visibleButton = this.presenter.questionnaireList[0].questionNumber !== 0;
        this.presenter.questionnaireList.map(x => x.score = 1);
      }
    });
  }

  onIonKnobMoveEnd(ev: Event, index: number) {
    let item = (ev as RangeCustomEvent).detail.value;
    this.presenter.questionnaireList[index].score = parseInt(item.toString());
  }

  async evQualify() {
    let obj = new QualifyDto();
    obj.teacherId = this.teacherId;
    obj.courseId = this.courseId;
    obj.qualificationTotal = this.presenter.questionnaireList.map(x => x.score).reduce((a, b) => a + b, 0);
    obj.questionScoreAverage = this.presenter.questionnaireList.map(x => x.score).reduce((a, b) => a + b, 0) / this.presenter.questionnaireList.length;
    obj.detail = this.presenter.questionnaireList;

    await this.presenter.postQuestionnaire(obj).then(() => {
      if (this.presenter.questionnaireResponse.status) {
        this.ngOnInit();
      }

      this.presenter.setOpenToast(true, this.presenter.questionnaireResponse.message);
    });

  }

  evReturn() {
    this.router.navigate(["/qualifying/teacher", this.courseId]);
  }

  evLogout() {
    this.authService.signOut();
    this.router.navigate(["/auth/login"]);
  }
}
