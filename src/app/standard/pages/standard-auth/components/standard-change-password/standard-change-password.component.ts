import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MustMatch } from '../../../../shared/validators/standard-mismatch.validator';
import Swal from 'sweetalert2';
import { CommonModule, Location } from '@angular/common';
import { StandardResponseStatus } from '../../../../shared/models/standard-response.model';
import { RouterModule } from '@angular/router';
import { StandardAppValidators } from '../../../../shared/validators/standard-app.validator';
import { StandardUserService } from '../../../standard-user/services/standard-user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { i18n } from '../../../../shared/models/standard-i18n.model';
import { TranslateModule } from '@ngx-translate/core';

type StandardChangePasswordPageType = "page" | "modal";

@Component({
  selector: 'app-standard-change-password',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './standard-change-password.component.html',
  styleUrl: './standard-change-password.component.scss'
})
export class StandardChangePasswordComponent implements OnInit {

  @Input() public NavigatFrom = '';
  public event: EventEmitter<string> = new EventEmitter();
  public i18n:i18n = new i18n();
  public changePasswordForm: FormGroup;
  public isSubmit: boolean = false;
  public pageType: StandardChangePasswordPageType = 'page';

  private cpid!: string;
  private uid!: string;
  private result: string | undefined;

  constructor(private form: FormBuilder,
    private location: Location,
    public modalRef: BsModalRef,
    private userService: StandardUserService) {

    this.changePasswordForm = this.form.group(
      {
        old: ["", [Validators.required]],
        new: ["", [
          Validators.required,
          Validators.pattern(StandardAppValidators.PASSWORD),
        ]],
        confirm: ["", [Validators.required]],
      },
      {
        validators: MustMatch("new", "confirm"),
      }
    );
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(
      sessionStorage.getItem("currentUser") || "{}"
    );
    this.cpid = currentUser.cpid;
    this.uid = currentUser.uid;
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    if(this.NavigatFrom == 'login'){
      this.changePasswordFromLogin();
    }else{
      this.userService.changeUserPassword(this.cpid, this.uid, this.changePasswordForm.get("old")?.value, this.changePasswordForm.get("new")?.value)
        .subscribe({
          next: (res) => {
            if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
              Swal.fire({
                title: "Success",
                text: "Password has been successfully changed.",
                icon: "success",
              }).then(()=> {
                this.event.emit(this.changePasswordForm.get("new")?.value);
                this.result = this.changePasswordForm.get("new")?.value;
                this.closed();
              });
            } else {
              Swal.fire("Error", res.message, "error");
            }
          },
          error: (err) => {
            Swal.fire("Error", err.message, "error");
          }
        });
    }
  }

  changePasswordFromLogin(){
    this.userService.changeUserPasswordInformation(this.cpid, this.uid, this.changePasswordForm.get("old")?.value, this.changePasswordForm.get("new")?.value)
      .subscribe({
        next: (res) => {
          if (res.status.toLowerCase() === StandardResponseStatus.SUCCESS) {
            Swal.fire({
              title: "Success",
              text: "Password has been successfully changed.",
              icon: "success",
            }).then(()=> {
              this.event.emit(this.changePasswordForm.get("new")?.value);
              this.result = this.changePasswordForm.get("new")?.value;
              this.closed();
            });
          } else {
            Swal.fire("Error", res.message, "error");
          }
        },
        error: (err) => {
          Swal.fire("Error", err.message, "error");
        }
      });
  }

  closed() {
    this.modalRef.hide();
  }

  onBack() {
    this.location.back();
  }


}
