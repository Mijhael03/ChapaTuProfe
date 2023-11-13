import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { Formatter } from "../utils/formatter";
import { environment } from "src/environments/environment";

@Injectable()
export class ApiService {

    urlAuthUser = `${environment.apiAuthentication}/auth`;

    constructor(private http: HttpClient) { }

    post(path: string, body = {}): Observable<any> {
        const headers = new HttpHeaders({
            "Content-Type": "application/json; charset=utf-8",
        });
        return this.http
            .post(path, JSON.stringify(body), { headers })
            .pipe(
                catchError((error) => {
                    return Formatter.httpErrorFormatter(error);
                })
            );
    }

    get(path: string, params?: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8'
        });
        return this.http.get(path, { params, headers }).pipe(
            catchError((error) => {
                return Formatter.httpErrorFormatter(error);
            })
        );
    }

    put(path: string, body = {}): Observable<any> {
        const headers = new HttpHeaders({
            "Content-Type": "application/json; charset=utf-8",
        });
        return this.http.put(path, JSON.stringify(body), { headers: headers }).pipe(
            catchError((error) => {
                return Formatter.httpErrorFormatter(error);
            })
        );
    }
}

