import { Component, OnInit, ViewChild, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzMessageService } from "ng-zorro-antd/message";
import { TranslateModule } from "@ngx-translate/core";
import { CompanyTemplateConfigComponent } from "../company-template-config/company-template-config.component";
import { StandardCompanyService } from "../../services/standard-company.service";
import { ICompany_V2, SearchCompany } from "../../models/standard-company.model";
import { StandardResponse } from "../../../../shared/models/standard-response.model";
import { IPagination } from "../../../../shared/models/standard-response.model";

@Component({
  selector: "app-company-template-config-page",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzGridModule,
    NzSelectModule,
    NzSpinModule,
    NzButtonModule,
    TranslateModule,
    CompanyTemplateConfigComponent,
  ],
  template: `
    <nz-card [nzTitle]="'pages.templateConfig.page.title' | translate">
      <div nz-row [nzGutter]="[16, 16]">
        <!-- Company Selector -->
        <div nz-col [nzSpan]="24">
          <div class="company-selector-section">
            <label class="selector-label">
              {{ "pages.templateConfig.page.companySelector.label" | translate }}
            </label>
            <nz-spin [nzSpinning]="loadingCompanies">
              <nz-select
                [formControl]="companyControl"
                [nzPlaceHolder]="'pages.templateConfig.page.companySelector.placeholder' | translate"
                nzShowSearch
                [nzFilterOption]="filterCompanyOption"
                class="company-selector"
              >
                @for (company of companies; track company.cpid) {
                  <nz-option [nzValue]="company.cpid" [nzLabel]="company.name"></nz-option>
                }
              </nz-select>
            </nz-spin>
          </div>
        </div>

        <!-- Template Configuration Section -->
        @if (selectedCompanyId) {
          <div nz-col [nzSpan]="24">
            <div class="template-config-section">
              <h3 class="section-title">
                {{ "pages.templateConfig.page.configSection.title" | translate }}
              </h3>
              <p class="section-description">
                {{ "pages.templateConfig.page.configSection.description" | translate }}
              </p>
              <app-company-template-config #templateConfig [cpid]="selectedCompanyId"></app-company-template-config>

              <!-- Save Button Section -->
              <div class="save-button-section">
                <button
                  nz-button
                  nzType="primary"
                  [nzLoading]="saving"
                  [disabled]="saving"
                  (click)="onSave()"
                  class="save-button"
                >
                  {{ "components.button.save" | translate }}
                </button>
              </div>
            </div>
          </div>
        } @else {
          <div nz-col [nzSpan]="24">
            <div class="empty-state">
              <p>{{ "pages.templateConfig.page.emptyState" | translate }}</p>
            </div>
          </div>
        }
      </div>
    </nz-card>
  `,
  styles: [
    `
      .company-selector-section {
        margin-bottom: 24px;
      }

      .selector-label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 14px;
      }

      .company-selector {
        width: 100%;
        max-width: 500px;
      }

      .template-config-section {
        padding: 24px;
        background: var(--wb-color-bg-container, #ffffff);
        border-radius: 8px;
        border: 1px solid var(--wb-color-border-secondary, #f0f0f0);
      }

      .section-title {
        margin: 0 0 8px 0;
        font-size: 16px;
        font-weight: 600;
        color: var(--wb-color-text-primary, #262626);
      }

      .section-description {
        margin: 0 0 16px 0;
        font-size: 14px;
        color: var(--wb-color-text-secondary, #8c8c8c);
      }

      .empty-state {
        padding: 48px;
        text-align: center;
        color: var(--wb-color-text-secondary, #8c8c8c);
        background: var(--wb-color-bg-container, #fafafa);
        border-radius: 8px;
        border: 1px dashed var(--wb-color-border-secondary, #d9d9d9);
      }

      .empty-state p {
        margin: 0;
        font-size: 14px;
      }

      .save-button-section {
        margin-top: 24px;
        padding-top: 24px;
        border-top: 1px solid var(--wb-color-border-secondary, #f0f0f0);
        display: flex;
        justify-content: flex-end;
      }

      .save-button {
        min-width: 100px;
      }
    `,
  ],
})
export class CompanyTemplateConfigPageComponent implements OnInit {
  @ViewChild("templateConfig") templateConfigComponent!: CompanyTemplateConfigComponent;

  private companyService = inject(StandardCompanyService);
  private message = inject(NzMessageService);

  companyControl = new FormControl<string | null>(null);
  companies: ICompany_V2[] = [];
  loadingCompanies = false;
  selectedCompanyId: string | null = null;
  saving = false;

  ngOnInit(): void {
    this.loadCompanies();
    this.setupCompanySelection();
  }

  private loadCompanies(): void {
    this.loadingCompanies = true;
    // Fetch all companies with large page size
    const searchCriteria = new SearchCompany();
    this.companyService.searchCompany_V2(1, 1000, searchCriteria).subscribe({
      next: (response: StandardResponse<IPagination<ICompany_V2>>) => {
        if (response.data && response.data.data) {
          this.companies = response.data.data;
        }
        this.loadingCompanies = false;
      },
      error: (error: any) => {
        console.error("Failed to load companies:", error);
        this.message.error("Failed to load companies");
        this.loadingCompanies = false;
      },
    });
  }

  private setupCompanySelection(): void {
    this.companyControl.valueChanges.subscribe((cpid) => {
      this.selectedCompanyId = cpid;
    });
  }

  filterCompanyOption = (input: string, option: any): boolean => {
    const label = option.nzLabel?.toLowerCase() || "";
    return label.includes(input.toLowerCase());
  };

  async onSave(): Promise<void> {
    if (!this.selectedCompanyId) {
      this.message.warning("Please select a company first");
      return;
    }

    this.saving = true;
    try {
      const success = await this.templateConfigComponent.saveTemplateConfig(this.selectedCompanyId);
      if (success) {
        this.message.success("Template configuration saved successfully");
      }
    } catch (error) {
      console.error("Error saving template configuration:", error);
      this.message.error("Failed to save template configuration");
    } finally {
      this.saving = false;
    }
  }
}
