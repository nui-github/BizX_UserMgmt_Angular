import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Pagination } from '../../models/pagination.model';
import { PaginationRequest } from '../../models/request.model';
import { IPaginationResponse, StandardResponse, StandardResponseStatus } from '../../models/response.model';
import { Observable, firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { StandardPermissionsConfig } from '../../../core/configs/standard-permissions.config';

interface Indexable {
  [key: string]: any;
}

@Component({ template: '' })
export abstract class StandardTrackingComponent<T, K> {
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
  public readonly APP_PERMISSION!: { [key: string]: string; };

  public pagination: Pagination = new Pagination();
  public paginationRequest: PaginationRequest<T> = new PaginationRequest<T>();
  public totalItems: number = 0;
  public isLoading: boolean = false;
  public abstract router: Router;

  constructor() {
    this.APP_PERMISSION = StandardPermissionsConfig.Permissions;
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
  }

  abstract fetchData(): Promise<IPaginationResponse<K>>;

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

  async eventOnDelete(_model: K, deleteObserverble: Observable<StandardResponse<void>>, confirmText = "Are you sure you want to delete this item?"): Promise<void> {
    try {
      if(!deleteObserverble) {
        throw new Error(`${this.pageTitle} delete failure.`);
      }
      let swalResult = await Swal.fire({
        title: "Warning",
        text: confirmText,
        icon: "warning",
        ...this.swalConfig,
      });
      if(swalResult.dismiss || !swalResult.value) return;

      this.isLoading = true;
      let res = await firstValueFrom(deleteObserverble);
      this.isLoading = false;
      if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
        Swal.fire(
          "Success",
          `${this.pageTitle} has been deleted.`,
          "success"
        ).then(() => {
          this.eventOnSearch();
        });
      } else {
        Swal.fire("Error", `${this.pageTitle} delete failure.`, "error");
      }
    } catch (e: any) {
      this.isLoading = false;
      Swal.fire("Error", e?.message ?? "", "error");
    }
  }
}
