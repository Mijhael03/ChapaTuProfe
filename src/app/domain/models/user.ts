export class User {
    userId!: number;
    careerId!: number;
    cycleNumber!: number;
    rolId!: number;
    code!: string;
    name!: string;
    lastname!: string;
    email!: string;
    token!: string;
    status!: string;

    isLoggedIn() {
        return this.userId !== 0;
    }

    isNotLoggedIn() {
        return !this.isLoggedIn();
    }
}
