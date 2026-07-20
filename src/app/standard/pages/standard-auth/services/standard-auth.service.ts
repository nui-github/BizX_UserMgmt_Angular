import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, tap, throwError, timeout } from 'rxjs';
import { AppConfig } from '../../../../app.config';
import { StandardResponse, StandardResponseStatus } from '../../../shared/models/standard-response.model';
import { StandardLoginResponse, ICheckForgotPassword } from '../models/standard-auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StandardAuthService {

  constructor(private http: HttpClient, public router: Router, public config: AppConfig) { }

  public login(username: string, password: string): Observable<StandardResponse<StandardLoginResponse>> {
    return this.http
      .post<StandardResponse<StandardLoginResponse>>(`${this.config.apiUrl}/users/login`, {
        username: username,
        password: password,
      })
      .pipe(
        timeout(this.config.apiTimeout),
        retry(this.config.apiRetry),
        map((res: StandardResponse<StandardLoginResponse>) => {
          if (res.status && res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
            let currentUser = res.data;
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
          }
          return res;
        })
      );
  }
  

  public logout(): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/logout`, {})
      .pipe(
        timeout(this.config.apiTimeout),
        retry(this.config.apiRetry),
        tap((res) => {
          sessionStorage.removeItem("currentUser");
          sessionStorage.removeItem("permissionList");
          this.router.navigate([""]);
        }),
        catchError((err) => {
          return this.errorHandler(err);
        })
      );
  }

  public getSession(username: string, password: string): Observable<StandardResponse<StandardLoginResponse>> {
    return this.http
      .post<StandardResponse<StandardLoginResponse>>(`${this.config.apiUrl}/users/getsession`, {
        username: username,
        password: password,
      })
      .pipe(
        timeout(this.config.apiTimeout),
        retry(this.config.apiRetry),
        map((res) => {
          if (res.status && res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
            sessionStorage.setItem("currentUser", JSON.stringify(res.data));
          }
          return res;
        })
      );
  }

  public forgotPassword(email: string): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/forgotpassword`, {
        email: email
      });
  }

  public forgotPasswordCheck(code: string | null): Observable<StandardResponse<ICheckForgotPassword>> {
    return this.http
      .post<StandardResponse<ICheckForgotPassword>>(`${this.config.apiUrl}/users/forgotpasswordcheck`, {
        code: code
      })
      .pipe(
        timeout(this.config.apiTimeout),
        retry(this.config.apiRetry),
        map((res) => {
          return res;
        })
      );
  }

  public forgotPasswordChange(code: string | null, password: string): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/forgotpasswordchange`, {
        code: code,
        password: password
      })
      .pipe(
        timeout(this.config.apiTimeout),
        retry(this.config.apiRetry),
        map((res) => {
          return res;
        })
      );
  }

  public errorHandler(error: HttpErrorResponse) {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("permissionList");
    return throwError(() => error.message || "server error.");
  }
}
