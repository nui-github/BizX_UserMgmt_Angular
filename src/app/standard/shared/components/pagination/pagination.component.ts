import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationConfig, PaginationModule } from "ngx-bootstrap/pagination";
import { i18nPagination } from '../../models/standard-pagination.model';
import { StandardTranslateService } from '../../service/standard-translate.service';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../models/standard-i18n.model';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationModule,TranslateModule,NzPaginationModule, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() pagination: any;
  @Output() pageChanged: EventEmitter<any> = new EventEmitter();
  public i18n:i18n = new i18n();
  public start:number = 0;
  public end:number = 0;
  public page:number = 0;
  public loading:boolean = false;
  constructor(private config: PaginationConfig,
    private translate:StandardTranslateService
  ) {
    this.config.main.boundaryLinks = true;
    this.config.main.rotate = false;
    this.config.main.maxSize = 5;
    this.config.main.previousText = "&rsaquo;";
    this.config.main.nextText = "&rsaquo;";
    this.config.main.firstText = "&laquo;";
    this.config.main.lastText = "&raquo;";
  }

  ngOnInit() {
  }

  message(pagination?: any) {
    this.start = (pagination.page - 1) * pagination.pageSize + 1;
    this.end =
      pagination.page * pagination.pageSize < pagination.collectionSize
        ? pagination.page * pagination.pageSize
        : pagination.collectionSize;
    this.page = pagination.collectionSize;
  }

  showingMessage(pagination?: any) {
    let start = (pagination.page - 1) * pagination.pageSize + 1;
    let end =
      pagination.page * pagination.pageSize < pagination.collectionSize
        ? pagination.page * pagination.pageSize
        : pagination.collectionSize;
    let page = pagination.collectionSize;

    return `${this.translate.getTranslated(this.i18n.pagination.showing)}  ${start} ${this.translate.getTranslated(this.i18n.pagination.to)} ${end}
    ${this.translate.getTranslated(this.i18n.pagination.of)} ${page} ${this.translate.getTranslated(this.i18n.pagination.entries)}`;
  }

  paginationOnChange($event: any) {
    this.pageChanged.emit($event);
  }

  nzPaginationOnChange($event: any) {
    let model = {
      page:$event,
      itemsPerPage:this.pagination.pageSize
    }
    this.pageChanged.emit(model);
  }

}
