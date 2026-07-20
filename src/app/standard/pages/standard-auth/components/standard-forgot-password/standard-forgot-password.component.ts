import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppConfig } from '../../../../../app.config';
import { StandardAuthService } from '../../services/standard-auth.service';
import { Router, RouterModule } from '@angular/router';
import { StandardForgotPasswordForm } from '../../models/standard-auth.model';
import Swal from 'sweetalert2';
import { StandardResponseStatus } from '../../../../shared/models/standard-response.model';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StandardTranslateService } from '../../../../shared/service/standard-translate.service';
@Component({
  selector: 'app-standard-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './standard-forgot-password.component.html',
  styleUrl: './standard-forgot-password.component.scss'
})
export class StandardForgotPasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup;
  public isSubmit: boolean = false;
  public email: FormControl;
  public isLoading: boolean = false;
  public forgotPwdTitle= "pages.standard.forgot.password.title";
  public forgotPwdSubTitle= "pages.standard.forgot.password.subTitle";
  public forgotPwdEmailTitle= "pages.standard.forgot.password.email.title";
  public forgotPwdEmailSubTitle= "pages.standard.forgot.password.email.subTitle";
  public forgotPwdSubmit= "pages.standard.forgot.password.submit";
  public forgotPwdBack= "pages.standard.forgot.password.back";
  public isRequiredMessage= "standard.validation.required";
  constructor(public config: AppConfig,
    private authenService: StandardAuthService,
    private location: Location,
    private router: Router,
    private standardTranslateService: StandardTranslateService) {
    this.email = new FormControl<string>('', Validators.required);

    this.forgotPasswordForm = new FormGroup<StandardForgotPasswordForm>({
      email: this.email
    });
  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isSubmit = true;

    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authenService.forgotPassword(this.email.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
          Swal.fire("Success", "Please reset password in url sending to your email.","success").then(() => {
            this.router.navigate(["/auth/login"]);
          });
        } else {
          let message = "Something wen't wrong. Please contact your administrator.";

          if (res.code !== "ERROR") {
            message = res.message;
          }
          Swal.fire({
            title: "Fail",
            text: message,
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Close",
            customClass: {
              confirmButton: "btn btn-secondary btn-fill swal2-close-btn"
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        Swal.fire({
          title: "Error",
          text: "Can't connect to server. Please contact your administrator.",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Close",
          customClass: {
            confirmButton: "btn btn-secondary btn-fill swal2-close-btn"
          }
        });
      }
    });
  }

  onBack() {
    this.location.back();
  }

  getLang(){
    return this.standardTranslateService.getLang();
  }
}
