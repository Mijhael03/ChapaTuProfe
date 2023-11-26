import { Injectable } from "@angular/core";
import { BaseQueryHandler } from "../base.query";
import { Failure } from "src/app/domain/error/failure";
import { Teacher } from "src/app/domain/models/qualifying/teacher";
import { QualifyingRepository } from "src/app/domain/repositories/qualifying.repository";

@Injectable()
export class GetTeachersQuery {
    courseId!: number;
}

@Injectable()
export class GetTeachersQueryHandler implements BaseQueryHandler<Promise<Teacher[]>, GetTeachersQuery>
{
    constructor(private qualifyingRepository: QualifyingRepository) { }

    handle(query: GetTeachersQuery): Promise<Teacher[]> {
        return new Promise((resolve, reject) => {
            this.qualifyingRepository.getTeachers(query.courseId)
                .subscribe({
                    next: (results: Teacher[]) => {
                        resolve(results);
                    },
                    error: (e: Failure) => reject(e)
                });
        });
    }
}
