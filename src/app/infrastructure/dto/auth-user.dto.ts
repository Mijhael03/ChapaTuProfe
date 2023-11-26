import { User } from "src/app/domain/models/user";

export class AuthUserDto {
    userId!: number;
    careerId!: number;
    cycleNumber!: number;
    rolId!: number;
    code!: string;
    name!: string;
    lastName!: string;
    email!: string;
    token!: string;
    status!: string;
}

export class AuthUserDtoTransformer {
    transform(dto: AuthUserDto): User {
        const user = new User();
        user.userId = dto.userId;
        user.careerId = dto.careerId;
        user.cycleNumber = dto.cycleNumber;
        user.rolId = dto.rolId;
        user.code = dto.code;
        user.name = dto.name;
        user.lastname = dto.lastName;
        user.email = dto.email;
        user.token = dto.token;
        user.status = dto.status;
        return user;
    }
}