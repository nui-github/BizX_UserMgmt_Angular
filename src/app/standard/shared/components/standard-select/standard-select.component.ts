import { AfterViewInit, Component, ContentChild, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessorDirective } from '../../directives/standard-control-value-accessor.directive';
import { EventEmitterModel } from '../../models/standard-event-emitter.model';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule, SelectControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StandardErrorMessage, StandardErrorMessageComponent } from '../standard-error-message/standard-error-message.component';
import { NgxSelectModule } from 'ngx-select-ex';

export interface IDropDownModel {
  value: string;
  label: string;
}

@Component({
  selector: 'app-standard-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSelectModule, StandardErrorMessageComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StandardSelectComponent),
      multi: true,
    },
  ],
  templateUrl: './standard-select.component.html',
  styleUrl: './standard-select.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class StandardSelectComponent<T> extends ControlValueAccessorDirective<T> implements AfterViewInit, OnChanges {

  @Input({ required: true }) public id: string = "standard-input-id";
  @Input() public name: string | null | undefined = null;
  // @Input() public type: InputType = 'text';
  @Input() public label: string = "StandardInputComponent Label";
  @Input() public subLabel: string = "StandardInputComponent Sub Label";
  @Input() public placeholder: string = "StandardInputComponent placeholder";
  @Input() public isSubmit: boolean = false;
  @Input() public override isRequired: boolean = false;
  @Input() public isValidated: boolean = false;
  @Input() public fieldName!: string;
  @Input() public optionFieldValue: string = "id";
  @Input() public optionFieldName: string = "name";
  @Input() public firstOptionName: string = 'Please Select';
  @Input() public errorMessages!: Record<string, StandardErrorMessage>;
  @Input() public isTouched: boolean = false;

  @ContentChild('contentTemplate', { static: false }) contentTemplate?: TemplateRef<any>;

  @Input() public datasources: any[] = [];
  public items: IDropDownModel[] = [];

  @Output() public eventEmitter: EventEmitter<any>  = new EventEmitter();
  public output: EventEmitterModel<any> = new EventEmitterModel<any>();

  override ngOnInit(): void {
    this.name = this.name ?? this.id;
    this.fieldName = this.fieldName ?? this.label;
    super.ngOnInit();

  }

  ngAfterViewInit(): void {
    // console.log(this.datasources);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes['datasources']) {
      this.fetchData(changes['datasources']?.currentValue);
    }
  }

  fetchData(datasources: any[]) {
    this.datasources = datasources || [];
    this.items = this.datasources.map((item) => {
      return  { value: item[this.optionFieldValue], label: item[this.optionFieldName] };
    });
  }

  eventOnChange($event: any): void {
    let value = $event;
    if (!$event) {
      this.output.value = $event;
      this.output.data = null;
      this.eventEmitter.emit(this.output);
      return;
    }

    let find = this.datasources.find(p => p[this.optionFieldValue] == value);
    if(find) {
      this.output.value = value;
      this.output.data = find;
    } else {
      this.output.value = value;
      this.output.data = null;
    }
    this.eventEmitter.emit(this.output);
  }

  private _ngxDefaultTimeout: any;
  private _ngxDefaultInterval: any;
  private _ngxDefault: any;


  public ngOnDestroy(): void {
      clearTimeout(this._ngxDefaultTimeout);
      clearInterval(this._ngxDefaultInterval);
  }

  public doNgxDefault(): any {
      return this._ngxDefault;
  }

  public inputTyped = (source: string, text: string) => console.log('SingleDemoComponent.inputTyped', source, text);

  public doFocus = () => console.log('SingleDemoComponent.doFocus');

  public doBlur = () => console.log('SingleDemoComponent.doBlur');

  public doOpen = () => console.log('SingleDemoComponent.doOpen');

  public doClose() {
    console.log('SingleDemoComponent.doClose');
    this.isTouched = true;
  }

  public doSelect = (value: any) => this.eventOnChange(value);

  public doRemove = (value: any) => console.log('SingleDemoComponent.doRemove', value);

  public doSelectOptions = (options: any[]) => console.log('SingleDemoComponent.doSelectOptions', options);
}
