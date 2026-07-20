import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadMatch, TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { noop, Observable, Observer, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { StandardSearchSubDistrict, TypeaheadBase } from '../../models/standard-subdistrict.model';
import { IPagination, StandardResponse } from '../../../../shared/models/response.model';
import { StandardSubdistrictService } from '../../services/standard-subdistrict.service';
import { CommonModule } from '@angular/common';
import { NgxSelectModule } from 'ngx-select-ex';
import { StandardErrorMessageComponent } from '../../../../shared/components/standard-error-message/standard-error-message.component';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-standard-subdistrict',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSelectModule, StandardErrorMessageComponent,TypeaheadModule,TranslateModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StandardSubdistrictComponent),
      multi: true,
    },
  ],
  templateUrl: './standard-subdistrict.component.html',
  styleUrl: './standard-subdistrict.component.scss'
})
export class StandardSubdistrictComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() input!: TypeaheadBase;
  @Output() onSelectChanged = new EventEmitter();
  @Output() onBlurChanged = new EventEmitter();
  @Input() public label: string = "StandardInputComponent Label";
  @Input() public subLabel: string = "StandardInputComponent Sub Label";
  @Input() public placeholder: string = "StandardInputComponent placeholder";
  @Input() public isSubmit: boolean = false;
  @Input() public isCreated: boolean = false;
  @Input() public isRequired: boolean = false;
  @Input() public isValidated: boolean = false;

  constructor(private masterSubdistrictService: StandardSubdistrictService) { }

  public suggestionSubDistrict$!: Observable<StandardSearchSubDistrict[]>;

  ngOnInit() {
    this.bindInput(this.input);
    this.suggestionSubDistrict$ = this.autoSearchSubDistrict(this.control);

  }

  bindInput(input: TypeaheadBase) {
    this.input = new TypeaheadBase({
      ...input,
      id: input && input.id || 'sub-district',
      typeaheadOptionField: input && input.typeaheadOptionField || 'subDistrictName',
      required: input && input.required || false
    })
  }

  onChange(result: TypeaheadMatch) {
    if(result != undefined) {
      this.onSelectChanged.emit(result.item);
    }
  }

  typeaheadOnBlur(result: any) {
    if(typeof result.item == "string") {
      this.onBlurChanged.emit({
        subDistrictName: result.item
      })
    } else {
      this.onBlurChanged.emit(result.item);
    }
  }

  autoSearchSubDistrict(control: FormControl) {
    return new Observable((observer: Observer<StandardSearchSubDistrict[]>) => {
      observer.next(control.value);
    }).pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((query: any) => {
        if (query && control.valid) {
          return this.masterSubdistrictService.searchSubDistrict(1, 10, query).pipe(
            map(
              (res: StandardResponse<IPagination<StandardSearchSubDistrict>>) =>
                (res && res.data && res.data.data) || []
            ),
            tap(
              () => noop,
              (err) => {
                console.log((err && err.message) || "Something goes wrong");
              }
            )
          );
        }
        return of([]);
      })
    );
  }

}
