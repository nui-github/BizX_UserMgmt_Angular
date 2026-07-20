import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../models/standard-i18n.model';
import { NzSelectModule } from 'ng-zorro-antd/select';
@Component({
  selector: 'app-standard-showing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, NzSelectModule],
  templateUrl: './standard-showing-page.component.html',
  styleUrl: './standard-showing-page.component.scss'
})
export class StandardShowingPageComponent implements OnInit {

  @Output() pageSizeChanged: EventEmitter<number> = new EventEmitter();
  @Input() public pageSizeConfig: number = 10;
  public i18n: i18n = new i18n();
  public pageSizes = [10, 25, 50, 100];
  constructor() {}

  ngOnInit() {}

  paginationOnChangeSize($event: number) {
    this.pageSizeChanged.emit($event);
  }
}
