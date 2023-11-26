import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { User } from "../domain/models/user";
import { UserRepository } from "../domain/repositories/user.repository";
import { BrowserStorage } from "./local/browser.storage";
import { ApiService } from "./remote/api.service";
import { AuthUserDto, AuthUserDtoTransformer } from "./dto/auth-user.dto";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(
        private apiService: ApiService,
        private browserStorage: BrowserStorage
    ) { }

    authUser(code: string, password: string): Observable<User> {
        return this.apiService.post(this.apiService.urlAuthUser, { code: code, password: password })
            .pipe(
                map((dto: AuthUserDto) => new AuthUserDtoTransformer().transform(dto))
            );
    }

    saveUserSession(user: User) {
        this.browserStorage.saveItem("userId", user.userId ? user.userId.toString() : "0");
        this.browserStorage.saveItem("careerId", user.careerId ? user.careerId.toString() : "0");
        this.browserStorage.saveItem("cycleNumber", user.cycleNumber ? user.cycleNumber.toString() : "0");
        this.browserStorage.saveItem("rolId", user.rolId ? user.rolId.toString() : "0");
        this.browserStorage.saveItem("code", user.code);
        this.browserStorage.saveItem("name", user.name);
        this.browserStorage.saveItem("lastname", user.lastname);
        this.browserStorage.saveItem("email", user.email);
        this.browserStorage.saveItem("token", user.token);
        this.browserStorage.saveItem("status", user.status);
    }

    getUserSession(): User {
        const user = new User();
        user.userId = this.browserStorage.getItem("userId") ? parseInt(this.browserStorage.getItem("userId")!.toString()) : 0;
        user.careerId = this.browserStorage.getItem("careerId") ? parseInt(this.browserStorage.getItem("careerId")!.toString()) : 0;
        user.cycleNumber = this.browserStorage.getItem("cycleNumber") ? parseInt(this.browserStorage.getItem("cycleNumber")!.toString()) : 0;
        user.rolId = this.browserStorage.getItem("rolId") ? parseInt(this.browserStorage.getItem("rolId")!.toString()) : 0;
        user.code = this.browserStorage.getItem("code") ? this.browserStorage.getItem("code")!.toString() : "";
        user.name = this.browserStorage.getItem("name") ? this.browserStorage.getItem("name")!.toString() : "";
        user.lastname = this.browserStorage.getItem("lastname") ? this.browserStorage.getItem("lastname")!.toString() : "";
        user.email = this.browserStorage.getItem("email") ? this.browserStorage.getItem("email")!.toString() : "";
        user.token = this.browserStorage.getItem("token") ? this.browserStorage.getItem("token")!.toString() : "";
        user.status = this.browserStorage.getItem("status") ? this.browserStorage.getItem("status")!.toString() : "";
        return user;
    }

    signOut() {
        this.browserStorage.clearStorage();
    }
}
