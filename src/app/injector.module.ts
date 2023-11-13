import { NgModule } from '@angular/core';
import { UserRepository } from './domain/repositories/user.repository';
import { UserRepositoryImpl } from './infrastructure/user.repository';
import { BrowserStorage } from './infrastructure/local/browser.storage';
import { ApiService } from './infrastructure/remote/api.service';

import { SignOutCommand, SignOutCommandHandler } from './application/commands/sign-out.command';
import { GetUserSessionQuery, GetUserSessionQueryHandler } from './application/queries/get-user-session.query';
import { AuthUserCommand, AuthUserCommandHandler } from './application/commands/auth-user.command';

@NgModule({
  imports: [],
  providers: [
    { provide: UserRepository, useClass: UserRepositoryImpl },
    BrowserStorage,
    ApiService,
    AuthUserCommand,
    AuthUserCommandHandler,
    SignOutCommand,
    SignOutCommandHandler,
    GetUserSessionQuery,
    GetUserSessionQueryHandler,
  ]
})
export class InjectorModule { }
