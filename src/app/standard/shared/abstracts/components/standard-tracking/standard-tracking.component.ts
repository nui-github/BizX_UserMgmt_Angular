import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, firstValueFrom } from 'rxjs';
import { IPaginationResponse, StandardResponse, StandardResponseStatus } from '../../../models/standard-response.model';
import { Router } from '@angular/router';
import { StandardPagination } from '../../../models/standard-pagination.model';
import { StandardPaginationRequest } from '../../../models/standard-request.model';
import Swal from 'sweetalert2';
import { StandardCrudService } from '../../services/standard-crud.service';
import { StandardAppPermissionService } from '../../../../core/services/standard-app-permission.service';
import { StandardFormService } from '../../../../core/services/standard-form.service';
import { i18n } from '../../../models/standard-i18n.model';
import { StandardTranslateService } from '../../../service/standard-translate.service';

interface Indexable {
  [key: string]: any;
}

@Component({ template: '' })
export abstract class StandardTrackingComponent<T,K> implements OnInit {

  public abstract pageTitle: string;

  private swalConfig: any = {
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No",
  };

  public abstract searchForm: FormGroup; //need implement
  public abstract criteriaSearch: T & Indexable; //need implement
  public abstract responseItems: K[] | undefined; //need implement
  public abstract key: string;
  public abstract absoluteUrl: string;
  public abstract fetchDataService: StandardCrudService<K, any>;
  public readonly APP_PERMISSION: { [key: string]: string; } = StandardAppPermissionService.Permissions;

  public pagination: StandardPagination = new StandardPagination();
  public paginationRequest: StandardPaginationRequest<T> = new StandardPaginationRequest<T>();
  public totalItems: number = 0;
  public isLoading: boolean = false;
  public abstract router: Router;
  public isVertical:boolean = true;
  public getScreenWidth: any;
  public getScreenHeight: any;
  public formService: StandardFormService = inject(StandardFormService);
  public translateService: StandardTranslateService = inject(StandardTranslateService);

  public i18n: i18n = new i18n();
  constructor() {
  }

  ngOnInit(): void {
    const keys = Object.keys(this.searchForm.controls);
    keys.forEach((key: string) => {
      this.searchForm.controls[key].valueChanges.subscribe(
        (value: any) => {
          (this.criteriaSearch as Indexable)[key] = value;
        }
      );
    });
    this.eventOnSearch();
    this.getWindowSize();
  }

  async fetchData(): Promise<IPaginationResponse<K>> {
    try {
      this.isLoading = true;
      let res = await firstValueFrom(this.fetchDataService.getTracking(this.paginationRequest));
      this.isLoading = false;
      return res.data;
    } catch (e) {
      this.isLoading = false;
      console.log(e);
      return Promise.reject(null)
    }
  }

  eventPageOnChanges($event: any) {
    this.pagination.page = $event.page || 0;
    this.paginationRequest.pageNumber = $event.page;
    this.fetchData().then(res => this.pageOnSetPagination(res));
  }

  eventOnPageSizeChange(event: any): void {
    this.pagination.pageSize = event || 0;
    this.paginationRequest.pageSize = event;
    this.paginationRequest.pageNumber = 1;
    this.pagination.page = 1;
    this.fetchData().then(res => this.pageOnSetPagination(res));
  }

  eventOnSearch() {
    this.pagination.page = 1;
    this.paginationRequest.criteria = this.criteriaSearch;
    this.paginationRequest.pageNumber = this.pagination.page;
    this.paginationRequest.pageSize = this.pagination.pageSize;
    this.fetchData().then(res => this.pageOnSetPagination(res));
  }

  pageOnSetPagination(res: IPaginationResponse<K>): void {
    this.responseItems = res.result ?? [];
    this.pagination.collectionSize = res.totalRecords ?? 0;
    this.totalItems = (this.pagination.page - 1) * this.pagination.pageSize;
  }

  eventOnClear(_patchValue?: T | Partial<T>) {
    if (_patchValue)
      this.searchForm.reset(_patchValue);
    else
      this.searchForm.reset();
    this.eventOnSearch();
  }

  eventOnAdd(): void {
    this.router.navigate([`${this.absoluteUrl}/add`]);
  }

  eventOnEdit(model: K & Indexable) {
    this.router.navigate([`${this.absoluteUrl}/edit`, model[this.key]]);
  }

  eventOnView(model: K & Indexable): void {
    this.router.navigate([`${this.absoluteUrl}/view`, model[this.key]]);
  }

  async eventOnDelete(model: K, confirmText = this.translate(this.i18n.alert.defaultdDelete)): Promise<void> {
    try {
      let swalResult = await Swal.fire({
        title: this.translate(this.i18n.alert.titleWarning),
        text: confirmText,
        icon: "warning",
        ...this.swalConfig,
      });
      if(swalResult.dismiss || !swalResult.value) return;

      this.isLoading = true;
      let res = await firstValueFrom(this.fetchDataService.delete(model) as Observable<StandardResponse<void>>);
      this.isLoading = false;
      if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
        Swal.fire(
          this.translate(this.i18n.alert.titleSuccess),
          `${this.translate(this.i18n.alert.deletePrefix)}${this.translate(this.pageTitle)}${this.translate(this.i18n.alert.deleteSuccess)}`,
          "success"
        ).then(() => {
          this.eventOnSearch();
        });
      } else {
        Swal.fire(this.translate(this.i18n.alert.titleError), `${this.translate(this.i18n.alert.deletePrefix)}${this.translate(this.pageTitle)}${this.translate(this.i18n.alert.deleteFailure)}`, "error");
      }
    } catch (e: any) {
      this.isLoading = false;
      Swal.fire("Error", e?.message ?? "", "error");
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    //console.log(this.getScreenWidth);
    this.getWindowSize();
  }
  @HostListener('window:size', ['$event'])
  onWindowSize() {
    //console.log(window.innerWidth)
    if(window.innerWidth && window.innerWidth <= 768){
      this.isVertical = false;
    }else{
      this.isVertical = true;
    }
  }
  getWindowSize(){
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if(this.getScreenWidth && this.getScreenWidth <= 768){
      this.isVertical = false;
    }else{
      this.isVertical = true;
    }
  }

  public translate(input: string){
    return this.translateService.getTranslated(input);
  }

}
