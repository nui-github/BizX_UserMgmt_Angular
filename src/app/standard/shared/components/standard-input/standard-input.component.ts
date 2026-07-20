import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewEncapsulation, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ControlValueAccessorDirective } from '../../directives/standard-control-value-accessor.directive';
import { CommonModule } from '@angular/common';
import { StandardErrorMessage, StandardErrorMessageComponent } from '../standard-error-message/standard-error-message.component';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-standard-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StandardErrorMessageComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StandardInputComponent),
      multi: true,
    },
  ],
  templateUrl: './standard-input.component.html',
  styleUrl: './standard-input.component.scss',
})
export class StandardInputComponent<T> extends ControlValueAccessorDirective<T> {
  @Input({ required: true }) public id: string = "standard-input-id";
  @Input() public name: string | null | undefined = null;
  @Input() public type: InputType = 'text';
  @Input() public label: string = "StandardInputComponent Label";
  @Input() public subLabel: string = "StandardInputComponent Sub Label";
  @Input() public placeholder: string = "StandardInputComponent placeholder";
  @Input() public isSubmit: boolean = false;
  @Input() public override isRequired: boolean = false;
  @Input() public maxlength: string | number | null = null;
  @Input() public isValidated: boolean = false;
  @Input() public isOptional: boolean = false;
  @Input() public fieldName: string = "StandardInputComponent";
  @Input() public errorMessages!: Record<string, StandardErrorMessage>;

  @ContentChild('contentTemplate', { static: false }) contentTemplate?: TemplateRef<any>;

  override ngOnInit(): void {
    this.name = this.name ?? this.id;
    super.ngOnInit();
  }

}
