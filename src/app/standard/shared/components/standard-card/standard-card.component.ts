import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-standard-card',
  standalone: true,
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    TranslateModule
  ],
  templateUrl: './standard-card.component.html',
  styleUrl: './standard-card.component.scss'
})
export class StandardCardComponent {

  @Input({ required: true }) cardTile!: string;
  @Input({ required: true }) cardSubtile!: string;

  @ContentChild('actionNewTemplate', { static: false }) actionNewTemplate!: TemplateRef<any> | null;
  @ContentChild('contentTemplate', { static: false }) contentTemplate!: TemplateRef<any> | null;
  
}
