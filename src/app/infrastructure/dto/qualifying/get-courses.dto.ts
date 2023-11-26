import { Course } from "src/app/domain/models/qualifying/course";

export class GetCoursesDto {
    courseId!: number;
    code!: string;
    description!: string;
    status!: string;
}

export class GetCoursesDtoTransformer {
    transform(dto: GetCoursesDto[]): Course[] {
        return dto.map(item => {
            let obj = new Course();
            obj.courseId = item.courseId;
            obj.code = item.code;
            obj.description = item.description;
            obj.status = item.status;
            return obj;
        });
    }
}
