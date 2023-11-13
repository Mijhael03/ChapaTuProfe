import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class QualifyingService {
    urlGetTest = `${environment.apiQualifying}/Maintenance/test`;
    urlPutTest = `${environment.apiQualifying}/Maintenance/testPut`;
    urlPostTest = `${environment.apiQualifying}/Maintenance/testPost`;
}