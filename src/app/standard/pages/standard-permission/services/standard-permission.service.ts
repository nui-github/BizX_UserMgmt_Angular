import { Injectable } from '@angular/core';
import { StandardPermission, StandardPermissionSearch } from '../models/standard-permission.model';
import { IPagination, IPaginationResponse, StandardResponse } from '../../../shared/models/standard-response.model';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../app.config';
import { Observable, map, retry, timeout } from 'rxjs';
import { StandardCrudService } from '../../../shared/abstracts/services/standard-crud.service';
import { StandardPaginationRequest } from '../../../shared/models/standard-request.model';

@Injectable({
  providedIn: 'root'
})
export class StandardPermissionService implements StandardCrudService<StandardPermission, string> {

  constructor(private http: HttpClient, private config: AppConfig) { }

  getTracking(paginationRequest: StandardPaginationRequest<StandardPermissionSearch>): Observable<StandardResponse<IPaginationResponse<StandardPermission>>> {
    return this.getPermissionList(paginationRequest.pageNumber, paginationRequest.pageSize, paginationRequest.criteria?.permissionCode ?? null)
      .pipe(
        map((res: StandardResponse<IPagination<StandardPermission>>) => {
          const paginationResponse: IPaginationResponse<StandardPermission> = {
            result: res?.data?.data ?? [],
            totalRecords: res?.data?.row ?? 0
          };
          let standardResponse: StandardResponse<IPaginationResponse<StandardPermission>> = {
            code: res.code,
            status: res.status,
            message: res.message,
            data: paginationResponse
          }
          return standardResponse;
        }
        ));
  }

  getById(id: string): Observable<StandardResponse<StandardPermission>> {
    return this.getPermissionById(id);
  }

  create(model: StandardPermission): Observable<StandardResponse<void>> | Observable<StandardResponse<any>> {
    return this.createPermission(model);
  }

  update(model: StandardPermission): Observable<StandardResponse<void>> | Observable<StandardResponse<any>> {
    return this.updatePermission(model);
  }

  delete(model: StandardPermission): Observable<StandardResponse<void>> {
    return this.deletePermission(model.id, model.permissionCode);
  }

  getPermissionList(
    pageNum: number,
    pageSize: number,
    permissionCode: string | null
  ): Observable<StandardResponse<IPagination<StandardPermission>>> {
    return this.http
      .post<StandardResponse<IPagination<StandardPermission>>>(`${this.config.apiUrl}/users/getlistpermission`, {
        permissionCode: permissionCode,
        pageNum: pageNum,
        pageSize: pageSize,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getPermissionListInformation(
    pageNum: number,
    pageSize: number,
    permissionCode: string | null
  ): Observable<StandardResponse<IPagination<StandardPermission>>> {
    return this.http
      .post<StandardResponse<IPagination<StandardPermission>>>(`${this.config.apiUrl}/users/getlistpermissioninformation`, {
        permissionCode: permissionCode,
        pageNum: pageNum,
        pageSize: pageSize,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getPermissionById(permId: string | null): Observable<StandardResponse<StandardPermission>> {
    return this.http
      .post<StandardResponse<StandardPermission>>(`${this.config.apiUrl}/users/getpermission`, {
        id: permId,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  createPermission(permission: StandardPermission): Observable<StandardResponse<StandardPermission>> {
    return this.http
      .post<StandardResponse<StandardPermission>>(
        `${this.config.apiUrl}/users/createpermission`,
        permission
      )
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updatePermission(permission: StandardPermission): Observable<StandardResponse<StandardPermission>> {
    return this.http
      .post<StandardResponse<StandardPermission>>(
        `${this.config.apiUrl}/users/updatepermission`,
        permission
      )
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  deletePermission(permId: number | null, permCode: string | null): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/deletepermission`, {
        id: permId,
        permissionCode: permCode,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
}
