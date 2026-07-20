import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, timeout, retry } from "rxjs";
import { AppConfig } from "../../../../app.config";

export interface TemplateTypeInfo {
  templateTypeCode: string;
  prompt: string;
  splitPage: boolean;
  customOcrProcess: boolean;
  customMergeProcess: boolean;
  modelName: string;
  dpiThreshold: boolean;
  dpiThresholdValue: number;
  pixelCountThresholdValue: number;
}

export interface CompanyTemplateConfig {
  id: string;
  cpid: string;
  templateTypeCode: string;
  isActive: boolean;
  createTime: string;
  lastUpdateTime: string;
}

export interface CompanyTemplateConfigResponse {
  cpid: string;
  companyName: string;
  templateConfigs: CompanyTemplateConfig[];
}

export interface SaveTemplateConfigRequest {
  cpid: string;
  templateTypeCodes: string[];
}

export interface StandardResponse<T> {
  code: string;
  message: string;
  status: string;
  data: T;
}

@Injectable({
  providedIn: "root",
})
export class CompanyTemplateConfigService {
  constructor(
    private http: HttpClient,
    private config: AppConfig,
  ) {}

  /**
   * Get all available template types from Document AI service
   */
  getAvailableTemplateTypes(): Observable<StandardResponse<TemplateTypeInfo[]>> {
    return this.http
      .get<
        StandardResponse<TemplateTypeInfo[]>
      >(`${this.config.apiUrl}/company-template-config/available-template-types`)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  /**
   * Get template configuration for a specific company
   */
  getCompanyTemplateConfig(cpid: string): Observable<StandardResponse<CompanyTemplateConfigResponse>> {
    return this.http
      .get<StandardResponse<CompanyTemplateConfigResponse>>(`${this.config.apiUrl}/company-template-config/${cpid}`)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  /**
   * Save/update template configuration for a company
   */
  saveCompanyTemplateConfig(
    request: SaveTemplateConfigRequest,
  ): Observable<StandardResponse<CompanyTemplateConfigResponse>> {
    return this.http
      .post<StandardResponse<CompanyTemplateConfigResponse>>(`${this.config.apiUrl}/company-template-config`, request)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  /**
   * Get active template types for a company (returns only template type codes)
   */
  getActiveTemplateTypesForCompany(cpid: string): Observable<StandardResponse<string[]>> {
    return this.http
      .get<StandardResponse<string[]>>(`${this.config.apiUrl}/company-template-config/${cpid}/active-template-types`)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }

  /**
   * Delete a specific template type configuration for a company
   */
  deleteTemplateConfig(cpid: string, templateTypeCode: string): Observable<StandardResponse<void>> {
    return this.http
      .delete<StandardResponse<void>>(`${this.config.apiUrl}/company-template-config/${cpid}/${templateTypeCode}`)
      .pipe(timeout(this.config.apiTimeout), retry(this.config.apiRetry));
  }
}
