import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzMessageService } from "ng-zorro-antd/message";
import { TranslateModule } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";
import { CompanyTemplateConfigService, TemplateTypeInfo } from "../../services/company-template-config.service";

@Component({
  selector: "app-company-template-config",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzSelectModule, NzSpinModule, TranslateModule],
  template: `
    <div nz-row [nzGutter]="16">
      <div nz-col [nzSpan]="24" [nzMd]="12">
        <nz-form-item>
          <nz-form-label nzFor="company-template-types">
            <span>
              {{ "pages.company.detail.templateConfig.label" | translate }}
              <br />
              <span class="form-label-small">{{ "pages.company.detail.templateConfig.sublabel" | translate }}</span>
            </span>
          </nz-form-label>
          <nz-form-control>
            <nz-spin [nzSpinning]="loading">
              <nz-select
                id="company-template-types"
                nzMode="multiple"
                nzPlaceHolder="{{ 'pages.company.detail.templateConfig.placeholder' | translate }}"
                [formControl]="templateTypesControl"
                [nzDisabled]="disabled || loading"
                (ngModelChange)="onSelectionChange($event)"
              >
                @for (option of availableTemplateTypes; track option.templateTypeCode) {
                  <nz-option [nzValue]="option.templateTypeCode" [nzLabel]="option.templateTypeCode"> </nz-option>
                }
              </nz-select>
            </nz-spin>
            <div class="form-text mt-2">
              {{ "pages.company.detail.templateConfig.hint" | translate }}
            </div>
          </nz-form-control>
        </nz-form-item>
      </div>
    </div>
  `,
  styles: [
    `
      .form-text {
        font-size: 12px;
        color: var(--wb-color-text-secondary, #8c8c8c);
      }
    `,
  ],
})
export class CompanyTemplateConfigComponent implements OnInit, OnChanges {
  @Input() cpid: string | null = null;
  @Input() disabled: boolean = false;
  @Input() isCreated: boolean = false;

  private templateConfigService = inject(CompanyTemplateConfigService);
  private message = inject(NzMessageService);

  templateTypesControl = new FormControl<string[]>(["General"]);
  availableTemplateTypes: TemplateTypeInfo[] = [];
  loading = false;

  async ngOnInit() {
    await this.loadAvailableTemplateTypes();

    if (this.cpid && !this.isCreated) {
      await this.loadCompanyTemplateConfig();
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    // When cpid changes (company selection changes), reload the config
    if (changes["cpid"] && !changes["cpid"].firstChange && changes["cpid"].currentValue) {
      await this.loadCompanyTemplateConfig();
    }
  }

  async loadAvailableTemplateTypes() {
    try {
      this.loading = true;
      const response = await firstValueFrom(this.templateConfigService.getAvailableTemplateTypes());

      if (response.status === "success" && response.data) {
        this.availableTemplateTypes = response.data;

        // Ensure "General" is always first
        this.availableTemplateTypes.sort((a, b) => {
          if (a.templateTypeCode === "General") return -1;
          if (b.templateTypeCode === "General") return 1;
          return a.templateTypeCode.localeCompare(b.templateTypeCode);
        });
      }
    } catch (error) {
      console.error("Error loading template types:", error);
      this.message.error("Failed to load available template types");
      // Set default
      this.availableTemplateTypes = [
        {
          templateTypeCode: "General",
          prompt: "Default template",
          splitPage: false,
          customOcrProcess: false,
          customMergeProcess: false,
          modelName: "default",
          dpiThreshold: false,
          dpiThresholdValue: 0,
          pixelCountThresholdValue: 0,
        },
      ];
    } finally {
      this.loading = false;
    }
  }

  async loadCompanyTemplateConfig() {
    if (!this.cpid) return;

    try {
      this.loading = true;
      const response = await firstValueFrom(this.templateConfigService.getCompanyTemplateConfig(this.cpid));

      if (response.status === "success" && response.data) {
        const templateCodes = response.data.templateConfigs
          .filter((config) => config.isActive)
          .map((config) => config.templateTypeCode);

        // If no configs, default to "General"
        this.templateTypesControl.setValue(templateCodes.length > 0 ? templateCodes : ["General"]);
      }
    } catch (error) {
      console.error("Error loading company template config:", error);
      // Keep default "General" on error
    } finally {
      this.loading = false;
    }
  }

  onSelectionChange(selectedCodes: string[]) {
    // Ensure at least one template type is selected (default to "General")
    if (!selectedCodes || selectedCodes.length === 0) {
      this.templateTypesControl.setValue(["General"], { emitEvent: false });
    }
  }

  /**
   * Get selected template type codes
   * To be called by parent component when saving
   */
  getSelectedTemplateTypes(): string[] {
    const selected = this.templateTypesControl.value || [];
    return selected.length > 0 ? selected : ["General"];
  }

  /**
   * Save template configuration
   * Can be called from parent component or internally
   */
  async saveTemplateConfig(cpid: string): Promise<boolean> {
    try {
      const templateTypeCodes = this.getSelectedTemplateTypes();

      const response = await firstValueFrom(
        this.templateConfigService.saveCompanyTemplateConfig({
          cpid,
          templateTypeCodes,
        }),
      );

      if (response.status === "success") {
        // Success message will be shown by parent component
        return true;
      } else {
        this.message.error("Failed to save template configuration");
        return false;
      }
    } catch (error) {
      console.error("Error saving template config:", error);
      this.message.error("Error saving template configuration");
      return false;
    }
  }
}
