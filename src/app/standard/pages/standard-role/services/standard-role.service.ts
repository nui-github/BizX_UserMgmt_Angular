import { Injectable } from '@angular/core';
import { StandardResponse, IPagination, IPaginationResponse } from '../../../shared/models/standard-response.model';
import { IRole, IRoleMenu, IRolePermission, Role, RoleMenuSearch, RolePermSearch, RoleSearch } from '../models/standard-role.model';
import { AppConfig } from '../../../../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, map, retry, timeout } from 'rxjs';
import { StandardCrudService } from '../../../shared/abstracts/services/standard-crud.service';
import { StandardPaginationRequest } from '../../../shared/models/standard-request.model';

@Injectable({
  providedIn: 'root'
})
export class StandardRoleService extends StandardCrudService<IRole,string> {
  override getTracking(paginationRequest: StandardPaginationRequest<any>): Observable<StandardResponse<any>> {
    return this.getRoleList(paginationRequest.pageNumber, paginationRequest.pageSize, paginationRequest.criteria ?? null)
    .pipe(
      map((res: StandardResponse<IPagination<IRole>>) => {
        const paginationResponse: IPaginationResponse<IRole> = {
          result: res?.data?.data ?? [],
          totalRecords: res?.data?.row ?? 0
        };
        let standardResponse: StandardResponse<IPaginationResponse<IRole>> = {
          code: res.code,
          status: res.status,
          message: res.message,
          data: paginationResponse
        }
        return standardResponse;
      }
      ));

  }
  override getById(id: string | null): Observable<StandardResponse<any>> {
    return this.getRoleById(id);
  }
  override create(model: IRole): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }
  override update(model: IRole): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }
  override delete(model: string | IRole): void | Observable<StandardResponse<void>> | Observable<void> {
    throw new Error('Method not implemented.');
  }

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) {
    super();
  }

  getRoleList(
    pageNum: number,
    pageSize: number,
    roleSearch: RoleSearch
  ): Observable<StandardResponse<IPagination<IRole>>> {
    return this.http
      .post<StandardResponse<IPagination<IRole>>>(`${this.config.apiUrl}/users/getlistrole`, {
        pageNum: pageNum,
        pageSize: pageSize,
        ...roleSearch,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  createRole(role: Role): Observable<StandardResponse<IRole>> {
    return this.http
      .post<StandardResponse<IRole>>(`${this.config.apiUrl}/users/createrole`, role)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getRoleById(id: string | null): Observable<StandardResponse<IRole>> {
    return this.http
      .post<StandardResponse<IRole>>(`${this.config.apiUrl}/users/getrole`, {
        id: id,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateRole(role: Role): Observable<StandardResponse<IRole>> {
    return this.http
      .post<StandardResponse<IRole>>(`${this.config.apiUrl}/users/updaterole`, role)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getRoleMenu(roleMenuSearch: RoleMenuSearch): Observable<StandardResponse<IRoleMenu[]>> {
    return this.http
      .post<StandardResponse<IRoleMenu[]>>(`${this.config.apiUrl}/users/getrolemenu`, roleMenuSearch)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getRolePermission(permMenuSearch: RolePermSearch): Observable<StandardResponse<IRolePermission[]>> {
    return this.http
      .post<StandardResponse<IRolePermission[]>>(
        `${this.config.apiUrl}/users/getrolepermission`,
        permMenuSearch
      )
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
}
