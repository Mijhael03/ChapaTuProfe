import { TeacherDetail } from "src/app/domain/models/qualifying/teacher-detail";

export class GetTeacherDetailDto {
    questionDescription!: string;
    questionScoreAverage!: number;
    qualificationAverage!: number;
    qualificationQuantity!: number;
    courseName!: string;
    teacherCodeName!: string;
    teacherPhoto!: string;
}

export class GetTeacherDetailDtoTransformer {
    transform(dto: GetTeacherDetailDto[]): TeacherDetail[] {
        return dto.map(item => {
            let obj = new TeacherDetail();
            obj.questionDescription = item.questionDescription;
            obj.questionScoreAverage = item.questionScoreAverage;
            obj.qualificationAverage = item.qualificationAverage;
            obj.qualificationQuantity = item.qualificationQuantity;
            obj.courseName = item.courseName;
            obj.teacherCodeName = item.teacherCodeName;
            obj.teacherPhoto = item.teacherPhoto;
            return obj;
        });
    }
}
