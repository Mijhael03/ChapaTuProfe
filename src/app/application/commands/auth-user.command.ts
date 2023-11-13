import { Injectable } from "@angular/core";
import { Failure } from "src/app/domain/error/failure";
import { User } from "src/app/domain/models/user";
import { UserRepository } from "src/app/domain/repositories/user.repository";
import { BaseCommandHandler } from "./base.handler";

@Injectable()
export class AuthUserCommand {
    code!: string;
    password!: string;
}

@Injectable()
export class AuthUserCommandHandler implements BaseCommandHandler<Promise<void>, AuthUserCommand>{

    constructor(private userRepository: UserRepository) { }

    handle(command: AuthUserCommand): Promise<void> {
        return new Promise((resolve, reject) => {
            this.userRepository.authUser(command.code, command.password)
                .subscribe({
                    next: (user: User) => {
                        if (user.isLoggedIn()) {
                            console.log("User in command", user)
                            this.userRepository.saveUserSession(user);
                            resolve()
                        } else {
                            reject()
                        }
                    },
                    error: (e) => reject("Código y/o contraseña incorrectos")
                }
                );
        });
    }

}