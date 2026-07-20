import { Injectable } from '@angular/core';
import { StandardCrudService } from '../../../shared/abstracts/services/standard-crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout, retry, map } from 'rxjs';
import { AppConfig } from '../../../../app.config';
import { StandardResponse, IPagination, IPaginationResponse } from '../../../shared/models/standard-response.model';
import { StandardGroup, SearchGroup, IGroup, GroupRoleMenu, IGroupRoleMenu, StandardGroupCreateForm, GroupRole } from '../models/standard-group.model';
import { StandardPaginationRequest } from '../../../shared/models/standard-request.model';

@Injectable({
  providedIn: 'root'
})
export class StandardGroupService implements StandardCrudService<StandardGroup, string> {

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) { }
   getTracking(paginationRequest: StandardPaginationRequest<any>): Observable<StandardResponse<any>> {
    // throw new Error('Method not implemented.');
    return this.getGroupList(paginationRequest.pageNumber, paginationRequest.pageSize, paginationRequest.criteria ?? null)
      .pipe(
        map((res: StandardResponse<IPagination<StandardGroup>>) => {
          const paginationResponse: IPaginationResponse<StandardGroup> = {
            result: res?.data?.data ?? [],
            totalRecords: res?.data?.row ?? 0
          };
          let standardResponse: StandardResponse<IPaginationResponse<StandardGroup>> = {
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
    return this.getGroupById(id);
  }
   create(model:  StandardGroup): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }
   update(model: StandardGroup): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }
   delete(model: string | StandardGroup): void | Observable<StandardResponse<void>> | Observable<void> {
    throw new Error('Method not implemented.');
  }

  getGroupList(
    pageNum: number,
    pageSize: number,
    search: SearchGroup
  ): Observable<StandardResponse<IPagination<StandardGroup>>> {
    return this.http
      .post<StandardResponse<IPagination<StandardGroup>>>(`${this.config.apiUrl}/users/getlistgroup`, {
        pageNum: pageNum,
        pageSize: pageSize,
        ...search,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateStatusGroup(group: StandardGroup): Observable<StandardResponse<StandardGroup>> {
    return this.http
      .post<StandardResponse<StandardGroup>>(`${this.config.apiUrl}/users/updategroupstatus`, group)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getApprovalList(cpid: string | null): Observable<StandardResponse<StandardGroup[]>> {
    return this.http
      .post<StandardResponse<StandardGroup[]>>(`${this.config.apiUrl}/users/group/list-approval`, { cpid: cpid })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getRoleMenus(data: IGroupRoleMenu): Observable<StandardResponse<GroupRoleMenu[]>> {
    return this.http
      .post<StandardResponse<GroupRoleMenu[]>>(`${this.config.apiUrl}/users/getrolemenudetail`, data)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  getGroupById(gid: string): Observable<StandardResponse<StandardGroup>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/getgroup`, { gid: gid })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  createGroup(group: StandardGroup): Observable<StandardResponse<StandardGroup>> {
    return this.http
      .post<StandardResponse<StandardGroup>>(`${this.config.apiUrl}/users/creategroup`, group)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateGroup(group: StandardGroup): Observable<StandardResponse<StandardGroup>> {
    return this.http
      .post<StandardResponse<StandardGroup>>(`${this.config.apiUrl}/users/updategroup`, group)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getGroupRoleList(id: string): Observable<StandardResponse<GroupRole[]>> {
    return this.http
      .post<StandardResponse<GroupRole[]>>(`${this.config.apiUrl}/users/getgrouprole`, { id: id })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
}
