
import { Injectable } from "@angular/core";
import { UserRepository } from "src/app/domain/repositories/user.repository";
import { BaseCommandHandler } from "./base.handler";

@Injectable()
export class SignOutCommand {
    constructor() { }
}

@Injectable()
export class SignOutCommandHandler implements BaseCommandHandler<void, SignOutCommand>{

    constructor(private userRepository: UserRepository) { }

    handle(command: SignOutCommand) {
        this.userRepository.signOut();
    }
}