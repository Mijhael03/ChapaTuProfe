import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MaintenanceService {
    urlGetTest = `${environment.apiMaintenance}/Maintenance/test`;
    urlPutTest = `${environment.apiMaintenance}/Maintenance/testPut`;
    urlPostTest = `${environment.apiMaintenance}/Maintenance/testPost`;
}