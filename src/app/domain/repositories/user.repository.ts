import { Observable } from 'rxjs';
import { User } from '../models/user';

export abstract class UserRepository {
    authUser!: (code: string, password: string) => Observable<User>;
    saveUserSession!: (user: User) => void;
    getUserSession!: () => User;
    signOut!: () => void;
}
