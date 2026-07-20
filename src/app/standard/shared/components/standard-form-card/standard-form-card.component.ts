import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { StandardErrorMessage, StandardErrorMessageComponent } from '../standard-error-message/standard-error-message.component';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { AlphanumericInputDirective } from '../../directives/standard-alphanumeric-input.directive';
import { UppercaseInputDirective } from '../../directives/standard-uppercase-input.directive';
import { EnglishCharacterInputDirective } from '../../directives/standard-english-character-input.directive';

export type InputConfigType = "text" | "number" | "password" | "email" | "select" | "switch" | "datetime" | "date" | "time" | "checkbox" | "radio" | "empty" | "checkboxInput" | "textarea" | "code" | "custom" | "selectValidate";

export interface StandardFormCardInputConfig {
  label: string;
  sublabel: string;
  name: string;
  id: string;
  formControlName: string;
  type: InputConfigType;
  showInput: boolean | null;
  options?: { label: string | null, value: string | boolean | number | null}[];
  rowspan?: number | null;
  offset?: number | null;
  newRow?: boolean;
  placeholder?: string;
  changeHandler?: (value: any) => void;
  errorMessages?: Record<string, StandardErrorMessage>;
  checkBoxLabel?: string;
  template?: TemplateRef<any> | null;
}

@Component({
  selector: 'app-standard-form-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzFlexModule,
    NzSwitchModule,
    NzDatePickerModule,
    StandardErrorMessageComponent,
    HttpClientModule,
    TranslateModule,
    AlphanumericInputDirective,
    UppercaseInputDirective,
    EnglishCharacterInputDirective
  ],
  templateUrl: './standard-form-card.component.html',
  styleUrl: './standard-form-card.component.scss'
})
export class StandardFormCardComponent implements OnInit,AfterViewInit {
  @Input({ required: true}) formGroup!: FormGroup;
  @Input() amountOfInputPerRow: number = 1;
  @Input() inputConfig: StandardFormCardInputConfig[] = [];
  @Input() isCreated: boolean = false;
  @Input() isSubmit: boolean = false;

  ngAfterViewInit() {
    if (this.el.nativeElement) {
      const inputElement = this.el.nativeElement.querySelector('.ant-select-selection-search-input');
      if (inputElement) {
        inputElement.type = 'text';
      }
    }
  }

  public placeholderSelect: string = "fields.select";

  @ContentChild('submitTemplate', { static: false }) submitTemplate!: TemplateRef<any> | null;

  constructor(private el: ElementRef) {
  }
  ngOnInit(): void {
  }

  getRows(): StandardFormCardInputConfig[][] {
    const rows: StandardFormCardInputConfig[][] = [];
    for (let i = 0; i < this.inputConfig.length; i += this.amountOfInputPerRow) {
      rows.push(this.inputConfig.slice(i, i + this.amountOfInputPerRow));
    }
    return rows;
  }

  handleChange(value: any, input: StandardFormCardInputConfig): void {
    if (input.changeHandler) {
      input.changeHandler(value);
    }
  }

  hasValidatorRequired(formControlName: string) {
    return this.formGroup.controls[formControlName].hasValidator(Validators.required);
  }

  changeInputCheckbox(formControlName:string, checked: boolean) {
    this.formGroup.controls[formControlName].setValue(checked ? -1 : null);
  }

}
