import { Injectable } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StandardTranslateService {

  public output: string = ""

  constructor(private translateService:TranslateService) { }

  public getTranslated(input :string, param?:Object) {
    return this.translateService.instant(input,param);
  }

  public getLang():string {
    return this.translateService.currentLang;
  }

}
