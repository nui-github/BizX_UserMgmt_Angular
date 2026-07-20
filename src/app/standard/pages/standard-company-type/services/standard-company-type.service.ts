import { Injectable } from '@angular/core';
import { StandardCrudService } from '../../../shared/abstracts/services/standard-crud.service';
import { CompanyType, CompanyTypeMenuSearch, CompanyTypeSearch, ICompanyType, IMenu, RegisterType, StandardCompanyType } from '../models/standard-company-type.model';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../app.config';
import { Observable, map, of, retry, timeout } from 'rxjs';
import { StandardPaginationRequest } from '../../../shared/models/standard-request.model';
import { IPagination, IPaginationResponse, StandardResponse } from '../../../shared/models/standard-response.model';

@Injectable({
  providedIn: 'root'
})
export class StandardCompanyTypeService extends StandardCrudService<any, number> {

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) {
    super()
  }

  getTracking(paginationRequest: StandardPaginationRequest<CompanyTypeSearch>): Observable<StandardResponse<any>> {
    return this.getCompanyTypeList(paginationRequest.pageNumber, paginationRequest.pageSize, paginationRequest.criteria)
      .pipe(
        map((res : StandardResponse<IPagination<ICompanyType>>) => {
          const paginationResponse: IPaginationResponse<ICompanyType> = {
            result: res?.data?.data ?? [],
            totalRecords: res?.data?.row ?? 0
          };
          let standardResponse: StandardResponse<IPaginationResponse<ICompanyType>> = {
            code: res.code,
            status: res.status,
            message: res.message,
            data: paginationResponse
          }
          return standardResponse;
        }))
  }

  getCompanyTypeList(
    pageNum: number,
    pageSize: number,
    companyTypeSearch: CompanyTypeSearch | null
  ) : Observable<StandardResponse<IPagination<ICompanyType>>> {
    return this.http.post<StandardResponse<IPagination<ICompanyType>>>(`${this.config.apiUrl}/users/gettrackingcompanytype`, {
      pageNum: pageNum,
      pageSize: pageSize,
      ...companyTypeSearch,
    })
    .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getById(id: number): Observable<StandardResponse<any>> {
    return this.getCompanyById(id)
  }

  override create(model: CompanyType): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    return this.createCompanyType(model)
  }

  update(model: CompanyType): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    return this.updateCompanyType(model)
  }

  delete(): Observable<StandardResponse<void>> {
    return new Observable<StandardResponse<void>>
  }

  getCompanyById(id: number | string): Observable<StandardResponse<ICompanyType>> {
    return this.http
    .post<StandardResponse<ICompanyType>>(`${this.config.apiUrl}/users/getcompanytype`, { id: id })
    .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  createCompanyType(companyType: CompanyType): Observable<StandardResponse<ICompanyType>> {
    return this.http
      .post<StandardResponse<ICompanyType>>(`${this.config.apiUrl}/users/createcompanytype`, companyType)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateCompanyType(companyType: CompanyType): Observable<StandardResponse<ICompanyType>> {
    return this.http
      .post<StandardResponse<ICompanyType>>(`${this.config.apiUrl}/users/updatecompanytype`, companyType)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getAllRegisterType(): Observable<StandardResponse<RegisterType[]>>{
    return this.http
    .post<StandardResponse<RegisterType[]>>(`${this.config.apiUrl}/users/getallregistertype`, {})
    .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));

  }

  getMenuAll(): Observable<StandardResponse<IMenu[]>> {
    return this.http
      .post<StandardResponse<IMenu[]>>(`${this.config.apiUrl}/users/getmenu`, {})
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getCompanyTypeMenu(companyTypeMenuSearch : CompanyTypeMenuSearch) : Observable<StandardResponse<IMenu[]>> {
    return this.http
      .post<StandardResponse<IMenu[]>>(`${this.config.apiUrl}/users/getcompanytypemenusearch`, companyTypeMenuSearch)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getCompanyType(): Observable<StandardResponse<ICompanyType[]>> {
    return this.http
      .post<StandardResponse<ICompanyType[]>>(`${this.config.apiUrl}/users/getlistcompanytype`, {})
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

}
