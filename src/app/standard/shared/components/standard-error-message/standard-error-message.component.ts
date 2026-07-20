import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { StandardTranslateService } from '../../service/standard-translate.service';
import { i18n } from '../../models/standard-i18n.model';


export type StandardErrorMessage = {
  message: string;
  validatorErrorsKey?: string[];
}

@Component({
  selector: 'app-standard-error-message',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  providers: [TranslatePipe],
  templateUrl: './standard-error-message.component.html',
  styleUrl: './standard-error-message.component.scss'
})
export class StandardErrorMessageComponent implements OnInit {

  @Input() public control!: AbstractControl;
  @Input() public fieldName!: string;
  @Input() messages!: Record<string, StandardErrorMessage> | undefined;
  private defaultMessages!: Record<string, StandardErrorMessage>;
  public i18n : i18n = new i18n();
  constructor(private translatePipe: TranslatePipe,
    private translateService:StandardTranslateService
  ) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    let label = this.translatePipe.transform(this.fieldName);
    this.defaultMessages = {
      'required': { message: this.convertValidate(label,'required',this.i18n.validation.required) },
      'minlength': { message: this.convertValidate(label,'required',this.i18n.validation.minlength), validatorErrorsKey: ['requiredLength'] },
      'maxlength': { message: this.convertValidate(label,'required',this.i18n.validation.maxlength), validatorErrorsKey: ['requiredLength'] },
      'email': { message: this.convertValidate(label,'required',this.i18n.validation.email) },
      // 'pattern': { message: `Invalid ${this.fieldName} pattern.` },
      // ...this.messages,
    };
    if(this.messages) {
      for (const [key, value] of Object.entries(this.messages)) {
        this.defaultMessages[key] = value;
      }
    }
  }

  get errorMessage() {
    for (const validatorName in this.control?.errors) {
      if (this.control.dirty || this.control.touched) {
        let message = this.getValidatorErrorMessage(validatorName, this.control.errors[validatorName]);
        return message;
      }
    }
    return null;
  }

  getValidatorErrorMessage = (validatorName: string, validatorErrors?: ValidationErrors): string | undefined => {
    let args = this.defaultMessages[validatorName]?.validatorErrorsKey?.map(name => validatorErrors?.[name]);
    return (args) ? this.stringFormat(this.defaultMessages[validatorName]?.message, ...args) : this.defaultMessages[validatorName]?.message;
  }

  stringFormat(template: string | undefined, ...args: any[]) {
    if (template) {
      return template.replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] !== 'undefined'
          ? args[index]
          : match;
      });
    }
    return undefined;
  }
  translate(input:string){
    return this.translateService.getTranslated(input);
  }

  // getLang(){
  //   if(this.translateService.getLang() == 'en'){
  //     console.log('en')
  //   }else{

  //   }
  // }

  convertValidate(input: string,type:string,i18n:string): string{
    if(this.translateService.getLang() == 'th'){
      if(type == 'required'){
        return `${this.translate(i18n)} ${input}`;
      }
      return `${input} ${this.translate(i18n)}`;
    }
    return `${input} ${this.translate(i18n)}`;
  }
}
