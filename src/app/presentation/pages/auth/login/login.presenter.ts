import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserRepository } from "src/app/domain/repositories/user.repository";
import { AuthUserCommand, AuthUserCommandHandler } from "src/app/application/commands/auth-user.command";

@Injectable()
export class LoginPresenter {

    isToastOpen: boolean = false;
    isLoadingOpen: boolean = false;
    isLoadingDismiss: boolean = false;
    messageToast: string = "";

    constructor(
        private authUserCommand: AuthUserCommand, private authUserCommandHandler: AuthUserCommandHandler,
        private auth: UserRepository,
        private router: Router
    ) { }

    authUser(code: string, password: string) {
        this.isLoadingOpen = true;
        this.authUserCommand.code = code;
        this.authUserCommand.password = password;
        this.authUserCommandHandler.handle(this.authUserCommand).then((value) => {
            this.isLoadingOpen = false;
            this.auth.getUserSession().rolId === 1 ? this.router.navigate(["maintenance/courses"]) : this.router.navigate(["qualifying/course"]);
        }).catch((error) => {
            this.isLoadingOpen = false;
            this.setOpenToast(true, error);
        });
    }

    setOpenToast(isOpen: boolean, message: string = "") {
        this.isToastOpen = isOpen;
        this.messageToast = message;
    }
}
