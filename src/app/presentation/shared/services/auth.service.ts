import { Injectable } from '@angular/core';
import { User } from '../../../domain/models/user';
import { SignOutCommand, SignOutCommandHandler } from 'src/app/application/commands/sign-out.command';
import { GetUserSessionQuery, GetUserSessionQueryHandler } from 'src/app/application/queries/get-user-session.query';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public getUserSessionQuery: GetUserSessionQuery,
    public getUserSessionQueryHandler: GetUserSessionQueryHandler,
    public signOutCommand: SignOutCommand,
    public signOutCommandHandler: SignOutCommandHandler,
  ) { }

  public getUser(): User {
    return this.getUserSessionQueryHandler.handle(this.getUserSessionQuery);
  }

  public signOut() {
    return this.signOutCommandHandler.handle(this.signOutCommand);
  }
}
