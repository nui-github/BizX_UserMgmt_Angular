import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, timeout, retry } from "rxjs/operators";
import { Observable } from "rxjs";
import { AppConfig } from "../../../../app.config";
import { IPagination, IPaginationResponse, StandardResponse } from "../../../shared/models/standard-response.model";
import { IMenu, Menu, MenuCompanyType, MenuSearch } from "../models/standard-menu.model";
import { StandardCrudService } from "../../../shared/abstracts/services/standard-crud.service";
import { StandardPaginationRequest } from "../../../shared/models/standard-request.model";


@Injectable({
  providedIn: 'root'
})
export class StandardMenuService implements StandardCrudService<IMenu, string> {

  constructor(private http: HttpClient, private config: AppConfig) {}

  getTracking(paginationRequest: StandardPaginationRequest<MenuSearch>): Observable<StandardResponse<any>> {
    return this.getMenuManageList(paginationRequest.pageNumber, paginationRequest.pageSize, paginationRequest.criteria)
      .pipe(
        map((res: StandardResponse<IPagination<IMenu>>) => {
          const paginationResponse: IPaginationResponse<IMenu> = {
            result: res?.data?.data ?? [],
            totalRecords: res?.data?.row ?? 0
          };
          let standardResponse: StandardResponse<IPaginationResponse<IMenu>> = {
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
    return this.getMenuById(id);
  }

  create(model: IMenu): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    return this.createMenu(model as Menu);
  }

  update(model: IMenu): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    return this.updateMenu(model as Menu);
  }

  delete(model: IMenu): Observable<StandardResponse<void>> {
    return this.deleteMenu(model) as unknown as Observable<StandardResponse<void>>;
  }

  getMenuAll(): Observable<StandardResponse<IMenu[]>> {
    return this.http
      .post<StandardResponse<IMenu[]>>(`${this.config.apiUrl}/users/getmenu`, {})
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getMenuManageList(
    pageNum: number,
    pageSize: number,
    menu: MenuSearch | null
  ): Observable<StandardResponse<IPagination<IMenu>>> {
    return this.http
      .post<StandardResponse<IPagination<IMenu>>>(`${this.config.apiUrl}/users/getlistmenumanage`, {
        pageNum: pageNum,
        pageSize: pageSize,
        ...menu,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getMenuList(
    pageNum: number,
    pageSize: number,
    menu: MenuSearch
  ): Observable<StandardResponse<IMenu[]>> {
    return this.http
      .post<StandardResponse<IMenu[]>>(`${this.config.apiUrl}/users/getlistmenu`, {
        pageNum: pageNum,
        pageSize: pageSize,
        ...menu,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getMenuById(menuId: string): Observable<StandardResponse<Menu>> {
    return this.http
      .post<StandardResponse<Menu>>(`${this.config.apiUrl}/users/getmenubyid`, { id: menuId })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  createMenu(menu: Menu): Observable<StandardResponse<IMenu>> {
    return this.http
      .post<StandardResponse<IMenu>>(`${this.config.apiUrl}/users/createmenu`, menu)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  updateMenu(menu: Menu): Observable<StandardResponse<IMenu>> {
    return this.http
      .post<StandardResponse<IMenu>>(`${this.config.apiUrl}/users/updatemenu`, menu)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  deleteMenu(menuId: IMenu): Observable<StandardResponse<string>> {
    return this.http
      .post<StandardResponse<string>>(`${this.config.apiUrl}/users/deletemenu`, { id: menuId.id })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getMainMenu(): Observable<StandardResponse<IMenu[]>> {
    return this.http
      .post<StandardResponse<IMenu[]>>(`${this.config.apiUrl}/users/getmainmenu`, {})
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getMenuCompanyType(data: MenuCompanyType): Observable<StandardResponse<IMenu[]>> {
    return this.http
      .post<StandardResponse<IMenu[]>>(`${this.config.apiUrl}/users/getcompanytypemenu`, data)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
}
