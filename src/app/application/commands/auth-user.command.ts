import { Injectable } from "@angular/core";
import { User } from "src/app/domain/models/user";
import { BaseCommandHandler } from "./base.handler";
import { UserRepository } from "src/app/domain/repositories/user.repository";

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
                            console.log("User auth", user)
                            this.userRepository.saveUserSession(user);
                            resolve()
                        } else {
                            reject()
                        }
                    },
                    error: () => reject("Código y/o contraseña incorrectos")
                });
        });
    }
}