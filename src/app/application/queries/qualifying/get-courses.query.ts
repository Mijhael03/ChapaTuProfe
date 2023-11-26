import { Injectable } from "@angular/core";
import { BaseQueryHandler } from "../base.query";
import { Failure } from "src/app/domain/error/failure";
import { Course } from "src/app/domain/models/qualifying/course";
import { QualifyingRepository } from "src/app/domain/repositories/qualifying.repository";


@Injectable()
export class GetCoursesQuery {
    studentId!: number;
    careerId!: number;
}

@Injectable()
export class GetCoursesQueryHandler implements BaseQueryHandler<Promise<Course[]>, GetCoursesQuery>
{
    constructor(private qualifyingRepository: QualifyingRepository) { }

    handle(query: GetCoursesQuery): Promise<Course[]> {
        return new Promise((resolve, reject) => {
            this.qualifyingRepository.getCourses(query.studentId, query.careerId)
                .subscribe({
                    next: (results: Course[]) => {
                        resolve(results);
                    },
                    error: (e: Failure) => reject(e)
                });
        });
    }
}
