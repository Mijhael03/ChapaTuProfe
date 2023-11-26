import { Injectable } from "@angular/core";
import { BaseQueryHandler } from "../base.query";
import { Failure } from "src/app/domain/error/failure";
import { TeacherDetail } from "src/app/domain/models/qualifying/teacher-detail";
import { QualifyingRepository } from "src/app/domain/repositories/qualifying.repository";

@Injectable()
export class GetTeacherDetailQuery {
    teacherId!: number;
    courseId!: number;
}

@Injectable()
export class GetTeacherDetailQueryHandler implements BaseQueryHandler<Promise<TeacherDetail[]>, GetTeacherDetailQuery>
{
    constructor(private qualifyingRepository: QualifyingRepository) { }

    handle(query: GetTeacherDetailQuery): Promise<TeacherDetail[]> {
        return new Promise((resolve, reject) => {
            this.qualifyingRepository.getTeacherDetail(query.teacherId, query.courseId)
                .subscribe({
                    next: (results: TeacherDetail[]) => {
                        resolve(results);
                    },
                    error: (e: Failure) => reject(e)
                });
        });
    }
}
