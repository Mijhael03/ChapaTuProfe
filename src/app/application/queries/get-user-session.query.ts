import { Injectable } from "@angular/core";
import { User } from "src/app/domain/models/user";
import { UserRepository } from "src/app/domain/repositories/user.repository";
import { BaseQueryHandler } from "./base.query";


@Injectable()
export class GetUserSessionQuery {
    constructor() { }
}

@Injectable()
export class GetUserSessionQueryHandler implements BaseQueryHandler<User, GetUserSessionQuery> {
    constructor(private userRepository: UserRepository) { }

    handle(query: GetUserSessionQuery): User {
        return this.userRepository.getUserSession();
    }
}
