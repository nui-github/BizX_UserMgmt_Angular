import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon, SweetAlertOptions, SweetAlertResult } from "sweetalert2";
import { StandardTranslateService } from "../../shared/service/standard-translate.service";
import { i18n } from "../../shared/models/standard-i18n.model";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public i18n: i18n = new i18n();
  constructor(private translate:StandardTranslateService) {
  }

  public alertDefaultDelete(text: string = "alert.default.delete") : Promise<SweetAlertResult<any>> {
    return this.alertMessage(this.i18n.alert.titleWarning, this.translate.getTranslated(text), "warning")
  }

  public alertDefaultSuccess(text: string) : Promise<SweetAlertResult<any>> {
    return this.alertMessage(this.i18n.alert.titleSuccess, this.translate.getTranslated(text), "success")
  }

  public alertDefaultError(text: string) : Promise<SweetAlertResult<any>> {
    return this.alertMessage(this.i18n.alert.titleError, this.translate.getTranslated(text), "error")
  }

  public alertMessage(title: string, text: string, icon: SweetAlertIcon) : Promise<SweetAlertResult<any>> {
    return Swal.fire({title: this.translate.getTranslated(text),text: this.translate.getTranslated(text), icon: icon})
  }

  public alertMessageOption(options: SweetAlertOptions) : Promise<SweetAlertResult<any>> {
    return Swal.fire({...options})
  }

}
