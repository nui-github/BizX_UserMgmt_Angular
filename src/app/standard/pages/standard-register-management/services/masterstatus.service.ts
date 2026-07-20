import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { timeout, retry } from "rxjs/operators";
import { Observable } from "rxjs";

import { StandardResponse } from "../../../shared/models/standard-response.model";
import { SearchStatus, Status } from "../models/status.model";
import { AppConfig } from "../../../../app.config";

@Injectable({
  providedIn: "root",
})
export class MasterStatusService {
  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) {}

  getMasterStatus(type: string): Observable<StandardResponse<Status[]>> {
    const params: SearchStatus = {
      type: type
    };
    return this.http
      .post<StandardResponse<Status[]>>(`${this.config.apiUrl}/users/status`, params)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

}
