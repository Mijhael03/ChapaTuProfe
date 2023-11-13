import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthUserCommand, AuthUserCommandHandler } from "src/app/application/commands/auth-user.command";
import { UserRepository } from "src/app/domain/repositories/user.repository";

@Injectable()
export class LoginPresenter {

    isLoading: boolean = false;
    isToastOpen: boolean = false;
    isLoadingOpen: boolean = false;
    messageToast: string = "";

    constructor(
        private authUserCommand: AuthUserCommand, private authUserCommandHandler: AuthUserCommandHandler,
        private auth: UserRepository,
        private router: Router
    ) { }

    async authUser(code: string, password: string) {
        this.setOpenLoading(true);
        this.isLoading = true;
        this.authUserCommand.code = code;
        this.authUserCommand.password = password;
        await this.authUserCommandHandler.handle(this.authUserCommand).then((value) => {
            this.auth.getUserSession().rolId === 1 ? this.router.navigate(["maintenance/courses"]) : this.router.navigate(["qualifying/course"]);
            this.setOpenLoading(false);
        }).catch((error) => {
            this.setOpenLoading(false);
            this.setOpenToast(true, error);
        });
    }

    setOpenToast(isOpen: boolean, message: string = "") {
        this.isToastOpen = isOpen;
        this.messageToast = message;
    }

    setOpenLoading(isOpen: boolean) {
        this.isLoadingOpen = isOpen;
    }

}
