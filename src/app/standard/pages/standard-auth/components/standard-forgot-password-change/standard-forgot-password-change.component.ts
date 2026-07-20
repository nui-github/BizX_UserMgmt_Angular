import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { StandardAuthService } from '../../services/standard-auth.service';
import { AppConfig } from '../../../../../app.config';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MustMatch } from '../../../../shared/validators/standard-mismatch.validator';
import { StandardResponseStatus } from '../../../../shared/models/standard-response.model';
import { CommonModule } from '@angular/common';
import { StandardAppValidators } from '../../../../shared/validators/standard-app.validator';
import { TranslateModule } from '@ngx-translate/core';
import { i18n } from '../../../../shared/models/standard-i18n.model';

@Component({
  selector: 'app-standard-forgot-password-change',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './standard-forgot-password-change.component.html',
  styleUrl: './standard-forgot-password-change.component.scss'
})
export class StandardForgotPasswordChangeComponent {

  public forgotPasswordForm: FormGroup;
  public isSubmit: boolean = false;
  public isLoading: boolean = false;

  public username!: FormControl;
  public password!: FormControl;
  public confirmpassword!: FormControl;

  private code!: string | null;
  public i18n:i18n = new i18n();
  constructor(
    public config: AppConfig,
    private authenService: StandardAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private form: FormBuilder
  ) {

    this.username = new FormControl("");
    this.password = new FormControl("", [
      Validators.required,
      Validators.pattern(StandardAppValidators.PASSWORD),
    ])
    this.confirmpassword = new FormControl("", [Validators.required]);

    this.forgotPasswordForm = this.form.group(
      {
        username: this.username,
        password: this.password,
        confirmpassword: this.confirmpassword
      },
      {
        validators: MustMatch("password", "confirmpassword"),
      }
    );

  }

  ngOnInit() {
    this.code = this.route.snapshot.queryParamMap.get('code');

    this.username?.disable();
    this.check();
  }

  reset() {
    this.isSubmit = true;
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.authenService
      .forgotPasswordChange(
        this.code,
        this.forgotPasswordForm.get("password")?.value
      )
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.status.toLowerCase() ===  StandardResponseStatus.SUCCESS) {
            Swal.fire("Success", "Reset password completed.", "success").then(
              (result) => {
                this.router.navigate(["/auth/login"]);
              }
            );
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
                confirmButton: "btn btn-secondary",
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
              confirmButton: "btn btn-secondary",
            }
          });
        }
      });
  }

  check(): void {
    this.authenService.forgotPasswordCheck(this.code)
      .subscribe({
        next: (res) => {
          if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS){
            this.username?.setValue(res.data.username);
          } else {
            let message = "Something wen't wrong. Please contact your administrator.";
            if (res.code === "EXPIRE") {
              Swal.fire("Fail", res.message, "error").then(
                (result) => {
                  this.router.navigate(["/auth/forgotpassword"]);
                }
              );
              return;
            }

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
                confirmButton: "btn btn-secondary",
              }
            });
          }
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            title: "Error",
            text: "Can't connect to server. Please contact your administrator.",
            icon: "error",
            buttonsStyling: false,
            confirmButtonText: "Close",
            customClass: {
              confirmButton: "btn btn-secondary",
            }
          });
        }
      });

  }

  onBack() {
    this.router.navigate(["/auth/login"]);
  }

}
