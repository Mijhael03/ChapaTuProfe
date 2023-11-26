import { Teacher } from "src/app/domain/models/qualifying/teacher";

export class GetTeachersDto {
    teacherId!: number;
    code!: string;
    name!: string;
    photo!: string;
    courseName!: string;
    qualificationTotal!: number;
}

export class GetTeachersDtoTransformer {
    transform(dto: GetTeachersDto[]): Teacher[] {
        return dto.map(item => {
            let obj = new Teacher();
            obj.teacherId = item.teacherId;
            obj.code = item.code;
            obj.name = item.name;
            obj.photo = item.photo;
            obj.courseName = item.courseName;
            obj.qualificationTotal = item.qualificationTotal;
            return obj;
        });
    }
}
