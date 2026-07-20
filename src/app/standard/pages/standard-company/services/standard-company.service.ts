import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../../app.config';
import { IPagination, IPaginationResponse, StandardResponse } from '../../../shared/models/standard-response.model';
import { Observable, map, retry, timeout } from 'rxjs';
import { SearchCompany, ICompany, ICompany_V2, ICompanyDuplicate } from '../models/standard-company.model';
import { StandardCrudService } from '../../../shared/abstracts/services/standard-crud.service';
import { StandardPaginationRequest } from '../../../shared/models/standard-request.model';
import { ICompanyType } from '../../standard-company-type/models/standard-company-type.model';

@Injectable({
  providedIn: 'root'
})
export class StandardCompanyService extends StandardCrudService<ICompany_V2, string> {
   getTracking(paginationRequest: StandardPaginationRequest<any>): Observable<StandardResponse<any>> {
    return this.searchCompany_V2(paginationRequest.pageNumber, paginationRequest.pageSize, paginationRequest.criteria ?? null)
      .pipe(
        map((res: StandardResponse<IPagination<ICompany_V2>>) => {
          const paginationResponse: IPaginationResponse<ICompany_V2> = {
            result: res?.data?.data ?? [],
            totalRecords: res?.data?.row ?? 0
          };
          let standardResponse: StandardResponse<IPaginationResponse<ICompany_V2>> = {
            code: res.code,
            status: res.status,
            message: res.message,
            data: paginationResponse
          }
          return standardResponse;
        }
        ));

  }
   getById(id: string): Observable<StandardResponse<any>> {
    return this.getCompany_V2(id);
  }
   create(model: ICompany_V2): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }
   update(model: ICompany_V2): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }
   delete(model: string | ICompany_V2): void | Observable<StandardResponse<void>> | Observable<void> {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) {
    super();
  }

  getListCompany(
    pageNum: number,
    pageSize: number,
    companySearch: SearchCompany
  ): Observable<StandardResponse<IPagination<ICompany>>> {
    return this.http
      .post<StandardResponse<IPagination<ICompany>>>(`${this.config.apiUrl}/users/getlistcompany`, {
        pageNum: pageNum,
        pageSize: pageSize,
        ...companySearch,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  searchCompany_V2(
    pageNum: number,
    pageSize: number,
    companySearch: SearchCompany
  ): Observable<StandardResponse<IPagination<ICompany_V2>>> {
    return this.http
      .post<StandardResponse<IPagination<ICompany_V2>>>(`${this.config.apiUrl}/users/v2/getlistcompany`, {
        pageNum: pageNum,
        pageSize: pageSize,
        ...companySearch,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateStatus(data:ICompany):Observable<StandardResponse<ICompany>>{
    return this.http.post<StandardResponse<ICompany>>(`${this.config.apiUrl}/users/updatecompanystatus`,data)
    .pipe(timeout(this.config.apiTimeout),retry(this.config.apiRetry));
  }
  getCompanyTypeByRegisterType(registerType: number| null): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/getlistcompanytypebyregistertype`, {
        registerType: registerType
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  checkDuplicateCompanyName(name: string): Observable<StandardResponse<ICompanyDuplicate>> {
    return this.http
      .post<StandardResponse<ICompanyDuplicate>>(`${this.config.apiUrl}/users/checkduplicatecompanyname`, {
        name: name,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  createCompany(company: ICompany): Observable<StandardResponse<ICompany>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/createcompany`, company)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateCompany(company: ICompany): Observable<StandardResponse<ICompany>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/updatecompany`, company)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  deleteCompany(cpid: string): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/deletecompany`, cpid)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getCompany_V2(cpid: string| null): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/v2/getcompany`, { cpid: cpid })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  createCompany_V2(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/v2/createcompany`, data)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateCompany_V2(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/v2/updatecompany`, data)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getCompanyType(): Observable<StandardResponse<ICompanyType[]>> {
    return this.http
      .post<StandardResponse<ICompanyType[]>>(`${this.config.apiUrl}/users/getlistcompanytype`, {})
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
}
