import { ActionResponseDto } from "src/app/domain/dto/action-response.dto";


export class GetActionResponseDto {
    code!: number;
    message!: string;
    idbdgenerado!: number;
    status!: boolean;
}
export class GetActionResponseDtoTransformer {
    transform(dto: GetActionResponseDto): ActionResponseDto {
        const domainObject = new ActionResponseDto()
        domainObject.status = dto.status
        domainObject.idGenerate = dto.idbdgenerado
        domainObject.code = dto.code
        domainObject.message = dto.message
        return domainObject;
    }
}

