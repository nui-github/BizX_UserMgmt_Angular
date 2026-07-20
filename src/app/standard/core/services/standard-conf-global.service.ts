import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../app.config';
import { StandardResponse } from '../../shared/models/standard-response.model';
import { Observable, retry, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandardConfGlobalService {

  constructor(private http: HttpClient, private config: AppConfig) {
  }

  public getAllConfig(): Observable<StandardResponse<{[key:string]: string}>> {
    return this.http
      .post<StandardResponse<{[key:string]: string}>>(`${this.config.apiUrl}/users/getallconfig`, {})
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  
}