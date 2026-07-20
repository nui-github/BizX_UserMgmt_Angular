import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../../app.config';
import { IPagination, IPaginationResponse, StandardResponse } from '../../../shared/models/standard-response.model';
import { Observable, map, retry, timeout } from 'rxjs';
import { SearchUser, IUser, User, ICheckDuplicateUser } from '../models/standard-user.model';
import { StandardCrudService } from '../../../shared/abstracts/services/standard-crud.service';
import { StandardPaginationRequest } from '../../../shared/models/standard-request.model';

@Injectable({
  providedIn: 'root'
})
export class StandardUserService implements StandardCrudService<IUser, string> {

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) {}

  getTracking(paginationRequest: StandardPaginationRequest<SearchUser>): Observable<StandardResponse<IPaginationResponse<IUser>>> {
    return this.getUserList(paginationRequest.pageNumber, paginationRequest.pageSize, paginationRequest.criteria ?? null)
      .pipe(
        map((res: StandardResponse<IPagination<IUser>>) => {
          const paginationResponse: IPaginationResponse<IUser> = {
            result: res?.data?.data ?? [],
            totalRecords: res?.data?.row ?? 0
          };
          let standardResponse: StandardResponse<IPaginationResponse<IUser>> = {
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
    return this.getUserById(id);
  }
  create(model: IUser): Observable<StandardResponse<void>> | Observable<StandardResponse<any>> {
    return this.createUser(model as unknown as User);
  }
   update(model: IUser): Observable<StandardResponse<void>> | Observable<StandardResponse<any>> {
    return this.updateUser(model as unknown as User);
  }
   delete(model: string | IUser): Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }

  getUserList(
    pageNum: number,
    pageSize: number,
    search: SearchUser | null
  ): Observable<StandardResponse<IPagination<IUser>>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/getlistuser`, {
        pageSize: pageSize,
        pageNum: pageNum,
        ...search,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  getUserListByUserVerify(
    pageNum: number,
    pageSize: number,
    search: SearchUser
  ): Observable<StandardResponse<IPagination<IUser>>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/api/user/get-list-user`, {
        pageSize: pageSize,
        pageNum: pageNum,
        ...search,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getUserById(uid: string| null): Observable<StandardResponse<IUser>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/getuser`, {
        id: uid,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getUserByIdInformation(uid: string): Observable<StandardResponse<IUser>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/getuserinformation`, {
        id: uid,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  createUser(user: User): Observable<StandardResponse<IUser>> {
    return this.http
      .post<StandardResponse<IUser>>(`${this.config.apiUrl}/users/createuser`, user);
  }

  updateUser(user: User): Observable<StandardResponse<void>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/updateuser`, user)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateUserInformation(user: User): Observable<StandardResponse<void>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/updateuserinformation`, user)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  deleteUser(uid: string): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/deleteuser`, {
        id: uid,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  changeGroupUser(user: User): Observable<StandardResponse<void>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/userchangegroup`, user)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateStatusUser(user: User): Observable<StandardResponse<void>> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/updatestatus`, user)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  checkDuplicateUser(username: string): Observable<StandardResponse<ICheckDuplicateUser>> {
    return this.http
      .post<StandardResponse<ICheckDuplicateUser>>(`${this.config.apiUrl}/users/checkduplicateusername`, {
        username: username,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  changeUserPassword(
    cpid: string,
    uid: string,
    oldpassword: string,
    newpassword: string
  ): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/changepassword`, {
        cpid: cpid,
        oldPassword: oldpassword,
        password: newpassword,
        uid: uid,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  changeUserPasswordInformation(
    cpid: string,
    uid: string,
    oldpassword: string,
    newpassword: string
  ): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/changepasswordinformation`, {
        cpid: cpid,
        oldPassword: oldpassword,
        password: newpassword,
        uid: uid,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  resetPassword(user: User): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/resetpassword`, user);
  }

  unlockUser(user: User): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/unlock-user`, user);
  }
}
