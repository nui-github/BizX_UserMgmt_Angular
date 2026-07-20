import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { StandardResponseStatus } from '../../../models/standard-response.model';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardCrudService } from '../../../abstracts/services/standard-crud.service';
import { StandardFormService } from '../../../../core/services/standard-form.service';
import { TranslateService } from '@ngx-translate/core';
import { StandardFormCardInputConfig } from '../../../components/standard-form-card/standard-form-card.component';
import { AlertService } from '../../../../core/services/alert.service';
import { i18n } from '../../../models/standard-i18n.model';
import { StandardTranslateService } from '../../../service/standard-translate.service';
@Component({ template: '' })
export abstract class StandardFormComponent<K> implements OnInit {

  public pageType: string = "add";
  public abstract pageTitle: string;
  public abstract fetchDataService: StandardCrudService<K, any>;
  public abstract formGroup: FormGroup;
  public model!: K;
  public readonly APP_PERMISSION: { [key: string]: string; } = StandardAppPermissionService.Permissions;
  public isSubmit: boolean = false;
  public isLoading: boolean = false;
  public isValidated: boolean = true;
  public hasPermissions: boolean = false;
  public isCreated: boolean = false;
  public id: string | null = null;
  public i18n:i18n = new i18n();

  public location: Location = inject(Location);
  public router: Router = inject(Router);
  public activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public permissions: StandardAppPermissionService = inject(StandardAppPermissionService);
  public fb: FormBuilder = inject(FormBuilder);
  public formService: StandardFormService = inject(StandardFormService);
  public translateService:TranslateService = inject(TranslateService);
  public alertService:AlertService = inject(AlertService);
  public successMessage = "";
  public failureMessage = "";
  public messageType= "";
  constructor() {
    this.activatedRoute.data.subscribe(data => {
      this.pageType = data['state'];
    });
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get("id") || null;
    });
  }

  ngOnInit(): void {
    if(!this.hasPermissions) {
      this.formGroup.disable();
    }

    if (this.pageType !== "add") {
      this.fetchData(this.id ?? "");
    }
  }

  public fetchData(id: string | number | null | undefined): void {
    this.isLoading = true;
    this.fetchDataService.getById(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.model = res ? res.data : {} as K;
        this.patchFormControls(res.data);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      }
    });
  }

  public patchFormControls(data: K & { [key: string]: any}) {
    this.formGroup.patchValue({
      ...data
    });
  }

  public onSave() {
    this.isSubmit = true;
    if (this.formGroup.invalid) {
      Object.values(this.formGroup.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    if (this.pageType === "add") {
      this.onCreate(this.formGroup.getRawValue() as K);
    } else if (this.pageType === "edit") {
      this.onUpdate(this.formGroup.getRawValue() as K);
    }
  }

  public async onCreate(model: K) {
    try {
      this.isLoading = true;
      let res = await firstValueFrom(this.fetchDataService.create(model));
      this.isLoading = false;
      if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
        this.onSuccess(`${this.successMessage}`);
      } else {
        this.onError(res.message);
      }
    } catch (e: any) {
      this.isLoading = false;
      this.onError(`${this.failureMessage}`);
    }
  }

  public async onUpdate(model: K) {
    try {
      this.isLoading = true;
      let res = await firstValueFrom(this.fetchDataService.update(model));
      this.isLoading = false;
      if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
        this.onSuccess(`${this.successMessage}`);
      } else {
        this.onError(res.message);
      }
    } catch (e: any) {
      this.isLoading = false;
      this.onError(`${this.failureMessage}`);
    }
  }

  public onSuccess(message: string) {
    this.alertService.alertDefaultSuccess(message).then(() => {
      this.onClosed();
    });
  }

  public onError(message: string) {
    this.alertService.alertDefaultError(message);
  }

  public onClosed() {
    this.location.back();
  }

  public isFormControlError(control: AbstractControl) {
    return control && control.errors;
  }

  public isFormControlSubmitError(control: AbstractControl) {
    return control && control.errors && (control.dirty || control.touched || this.isSubmit);
  }

  public isFormControlRequired(control: AbstractControl) {
    return control && control.errors && control.errors['required'];
  }

  // translate

  // public translate(input: string,map: StandardFormCardInputConfig): StandardFormCardInputConfig{
  //   return this.translateService.get(input).subscribe((translate: string) => {
  //     map.label = translate;
  //     return map;
  //   });
  // }
  public async translate(label: string, sublabel: string, map: StandardFormCardInputConfig): Promise<StandardFormCardInputConfig> {
    const translateLabel = await firstValueFrom(this.translateService.get(label));
    map.label = translateLabel;
    if(sublabel){
      const translateSubLabel = await firstValueFrom(this.translateService.get(sublabel));
      map.sublabel = translateSubLabel;
    }
    return map;
  }
}
