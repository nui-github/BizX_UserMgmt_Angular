import { Injectable } from '@angular/core';
import { StandardCrudService } from '../../../shared/abstracts/services/standard-crud.service';
import { ApproveRegister, CheckVatCorporation, CreateRegister, Register, RegisterAttachmentDocumentType, RegisterType, SearchRegister, SearchRegisterAttachmentDocument, SearchRegisterAttachmentDocumentPayload, SearchRegisterType, SearchRegisterTypeAttachment } from '../models/standard-register-management.model';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../app.config';
import { Observable, map, timeout, retry } from 'rxjs';
import { StandardPaginationRequest } from '../../../shared/models/standard-request.model';
import { StandardResponse, IPagination, IPaginationResponse } from '../../../shared/models/standard-response.model';

@Injectable({
  providedIn: 'root'
})
export class StandardRegisterManagementService extends StandardCrudService<Register, string> {

  constructor(
    private http: HttpClient,
    private config: AppConfig
  ) {
    super();
  }
  private _options: any = {
    responseType: "blob"
  };
  override getTracking(paginationRequest: StandardPaginationRequest<any>): Observable<StandardResponse<any>> {
    return this.getRegisterList(paginationRequest.pageNumber, paginationRequest.pageSize, paginationRequest.criteria ?? null)
      .pipe(
        map((res: StandardResponse<IPagination<Register>>) => {
          const paginationResponse: IPaginationResponse<Register> = {
            result: res?.data?.data ?? [],
            totalRecords: res?.data?.row ?? 0
          };
          let standardResponse: StandardResponse<IPaginationResponse<Register>> = {
            code: res.code,
            status: res.status,
            message: res.message,
            data: paginationResponse
          }
          return standardResponse;
        }
        ));
  }
  override getById(id: string): Observable<StandardResponse<any>> {
    return this.getRegisterById(id);
  }
  override create(model: Register): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }
  override update(model: Register): Observable<StandardResponse<any>> | Observable<StandardResponse<void>> {
    throw new Error('Method not implemented.');
  }
  override delete(model: string | Register): void | Observable<StandardResponse<void>> | Observable<void> {
    throw new Error('Method not implemented.');
  }

  getRegisterList(
    pageNum: number,
    pageSize: number,
    registerSearch: SearchRegister
  ): Observable<StandardResponse<IPagination<Register>>> {
    return this.http
      .post<StandardResponse<IPagination<Register>>>(`${this.config.apiUrl}/users/getlistregister`, {
        pageNum: pageNum,
        pageSize: pageSize,
        ...registerSearch,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  getRegisterTypeList(data: SearchRegisterType): Observable<StandardResponse<RegisterType[]>> {
    return this.http
      .post<StandardResponse<RegisterType[]>>(`${this.config.apiUrl}/users/getlistregistertype`, data)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  checkVatCorporation(data: CheckVatCorporation): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/register/verifyvatcorporation`, data)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  resendEmailRegister(id: string | null): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/registerresendemail`, {
        id: id,
      });
  }
  getRegisterById(id: string | null): Observable<StandardResponse<Register>> {
    return this.http
      .post<StandardResponse<Register>>(`${this.config.apiUrl}/users/getregister`, {
        id: id,
      })
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  getListRegisterAttachmentType(data: SearchRegisterTypeAttachment):
  Observable<StandardResponse<RegisterAttachmentDocumentType[]>> {
    return this.http
      .post<StandardResponse<RegisterAttachmentDocumentType[]>>(`${this.config.apiUrl}/users/getlistregisterattachmenttype`, data)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  getRegisterAttachment(data: SearchRegisterAttachmentDocument): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/getregisterattachment`, data)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  getRegisterAttachmentPayload(data: SearchRegisterAttachmentDocumentPayload): Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/getregisterattachmentpayload`, data, this._options)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
  createRegister(register: CreateRegister, files: any[]) : Observable<any> {
    let json = JSON.stringify(register);
    let formData = new FormData();
    formData.append("json", JSON.stringify(register));
    if(files && files.length > 0) {
      files.map(file => formData.append("files", file))
    }

    return this.http
      .post<any>(`${this.config.apiUrl}/users/register/create`, formData);
  }

  verifyRegister(companyTaxId: any) : Observable<any> {
    return this.http
      .post<any>(`${this.config.apiUrl}/users/register/verify`, companyTaxId)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  approveRejectRegister(register: ApproveRegister): Observable<StandardResponse<void>> {
    return this.http
      .post<StandardResponse<void>>(`${this.config.apiUrl}/users/approveregister`, register);
  }

}
