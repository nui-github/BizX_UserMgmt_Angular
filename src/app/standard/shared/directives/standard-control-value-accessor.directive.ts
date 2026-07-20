import { Directive, Inject, Injector, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  Validators,
  NgControl,
  FormControlName,
  FormGroupDirective,
  FormControlDirective,
  NgModel,
} from '@angular/forms';
import { Subject, takeUntil, startWith, distinctUntilChanged, tap } from 'rxjs';

@Directive({
  selector: '[appControlValueAccessor]',
  standalone: true,
})
export class ControlValueAccessorDirective<T>
  implements ControlValueAccessor, OnInit {
  control!: FormControl;
  isRequired = false;

  private _isDisabled = false;
  private _destroy$ = new Subject<void>();
  private _onTouched!: () => T;

  constructor(@Inject(Injector) private injector: Injector) { }

  ngOnInit() {
    this.setFormControl();
    this.isRequired = this.control?.hasValidator(Validators.required) ?? false;
  }

  setFormControl() {
    try {
      const injectedControl = this.injector.get(NgControl);

      switch (injectedControl.constructor) {
        case NgModel: {
          const { control, update } = injectedControl as NgModel;

          this.control = control;

          this.control.valueChanges
            .pipe(
              tap((value: T) => update.emit(value)),
              takeUntil(this._destroy$),
            )
            .subscribe();
          break;
        }
        case FormControlName: {
          this.control = this.injector.get(FormGroupDirective).getControl(injectedControl as FormControlName);
          break;
        }
        default: {
          this.control = (injectedControl as FormControlDirective).form as FormControl;
          break;
        }
      }
    } catch (err) {
      this.control = new FormControl();
    }
  }

  writeValue(value: T): void {
    // this.control
    //   ? this.control.setValue(value)
    //   : (this.control = new FormControl(value));
    this.onChanged(value);
  }

  registerOnChange(fn: (val: T | null) => T): void {
    // this.control?.valueChanges
    //   .pipe(
    //     takeUntil(this._destroy$),
    //     startWith(this.control.value),
    //     distinctUntilChanged(),
    //     tap((val) => fn(val))
    //   )
    //   .subscribe(() => this.control?.markAsUntouched());
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => T): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this._isDisabled = isDisabled;
  }

  onChanged(value: any) {
  }

  onTouched(value: any) {
  }

}