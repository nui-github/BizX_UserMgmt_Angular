import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../../app.config';
import { IPagination, StandardResponse } from '../../../shared/models/response.model';
import { Observable, retry, timeout } from 'rxjs';
import { StandardSearchSubDistrict } from '../models/standard-subdistrict.model';
@Injectable({
  providedIn: 'root'
})
export class StandardSubdistrictService {

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { }

  searchSubDistrict(pageNum: number, pageSize: number, search: string): Observable<StandardResponse<IPagination<StandardSearchSubDistrict>>> {
    return this.http
      .post<StandardResponse<IPagination<StandardSearchSubDistrict>>>
      (`${this.config.apiUrl}/users/master/sub-district/search`, {
        pageNum: pageNum,
        pageSize: pageSize,
        subDistrictName: search,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
}
