import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StandardFormService {

  constructor(public fb: FormBuilder) { }

  createFormGroup<T extends {}>(formModelClass: new () => T): FormGroup {
    const formModelInstance = new formModelClass();
    const formGroup: { [key: string]: FormControl } = {};

    for (const key of Object.keys(formModelInstance)) {
      const formControl = formModelInstance[key as keyof T];
      if (formControl instanceof FormControl) {
        formGroup[key] = formControl;
      }
    }
    return this.fb.group(formGroup);
  }
}
