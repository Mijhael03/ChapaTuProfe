import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Failure } from "src/app/domain/error/failure";

export class Formatter {
    static httpErrorFormatter(error: HttpErrorResponse) {
        const failure = new Failure();
        failure.message = error.error ? error.error : error;
        failure.code = "HTTP " + error.status;
        return throwError(failure);
    }
}