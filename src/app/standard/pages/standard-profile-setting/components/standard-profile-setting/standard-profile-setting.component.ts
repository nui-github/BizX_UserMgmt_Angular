import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
// import { CoreModule } from '../../../../core/core.module';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IStandardProfileSettingForm, StandardProfileSettingForm } from '../../models/standard-profile-setting.model';
import { StandardUserService } from '../../../standard-user/services/standard-user.service';
import { firstValueFrom } from 'rxjs';
import { IUser, User } from '../../../standard-user/models/standard-user.model';
import { StandardInputComponent } from '../../../../shared/components/standard-input/standard-input.component';
// import { ShareModule } from '../../../../shared/share.module';
import { StandardErrorMessage } from '../../../../shared/components/standard-error-message/standard-error-message.component';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { StandardFormCardComponent, StandardFormCardInputConfig } from '../../../../shared/components/standard-form-card/standard-form-card.component';
import { StandardFormComponent } from '../../../../shared/abstracts/components/standard-form/standard-form.component';
import { StandardCardComponent } from '../../../../shared/components/standard-card/standard-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-standard-profile-setting',
  standalone: true,
  imports: [CommonModule, StandardInputComponent, FormsModule, StandardFormCardComponent, StandardCardComponent,
    NzGridModule,
    NzCardModule,
    TranslateModule,
    ReactiveFormsModule],
  templateUrl: './standard-profile-setting.component.html',
  styleUrl: './standard-profile-setting.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class StandardProfileSettingComponent implements OnInit {
  public profileSettingForm: FormGroup;
  public currentUser!: { [key: string]: string};
  public  isLoading: boolean = false;
  public  isSubmit: boolean = false;
  public  isCreated: boolean = false;
  public  isValidated: boolean = true;
  public isEdited: boolean = false;
  public user: IUser | null = null;
  public btnName: string = "Edit";
  public welcome: string = "pages.profile.setting.page.welcome";
  public editButtonMessage: string = "pages.profile.setting.page.button.edit";
  public saveButtonMessage: string = "pages.profile.setting.page.button.save";
  public cancelButtonMessage: string = "pages.profile.setting.page.button.cancel";

  public inputConfig: StandardFormCardInputConfig[] = [
    {
      id: "umpf-firstname",
      name: "umpf-firstname",
      formControlName: "firstname",
      label: "pages.user.detail.input.firstName.label",
      sublabel: "pages.user.detail.input.firstName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "Please fill in"
    },
    {
      id: "umpf-lastname",
      name: "umpf-lastname",
      formControlName: "lastname",
      label: "pages.user.detail.input.lastName.label",
      sublabel: "pages.user.detail.input.lastName.sublabel",
      type: 'text',
      showInput: true,
      placeholder: "Please fill in"
    },
    {
      id: "umpf-phone",
      name: "umpf-phone",
      formControlName: "phone",
      label: "pages.user.detail.input.telNumber.label",
      sublabel: "pages.user.detail.input.telNumber.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.phone"},
      }
    },
    {
      id: "umpf-email",
      name: "umpf-email",
      formControlName: "email",
      label: "pages.user.detail.input.email.label",
      sublabel: "pages.user.detail.input.email.sublabel",
      type: 'text',
      showInput: true,
      errorMessages: {
        'pattern': { message: "standard.validation.email.pattern"},
      }
    }
  ]


  private swalConfig: any = {
    focusCancel: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: "#dc3545",
    cancelButtonText: "No",
  };

  public profileSettingErrorMessagePhone: Record<string, StandardErrorMessage> = {
    'pattern': { message: "standard.validation.phone"}
  }

  public profileSettingErrorMessageEmail: Record<string, StandardErrorMessage> = {
    'pattern': { message: "standard.validation.email.pattern"}
  }

  constructor(private userService: StandardUserService) {
    this.profileSettingForm = new FormGroup({
      ...new StandardProfileSettingForm()
    })
  }

  async ngOnInit(): Promise<void> {
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser") ?? "{}");
    await this.fetchData();

  }

  async fetchData() {
    this.isLoading = true;
    let res = await firstValueFrom(this.userService.getUserByIdInformation(this.currentUser['uid']));
    this.isLoading = false;
    this.user = res?.data;
    await this.patchFormControls(this.user);
  }

   patchFormControls(data: IUser) {
    const maskUp: string = "**********";

    this.profileSettingForm.patchValue({
      username: data.username,
      firstname: data?.firstName,
      lastname: data?.lastName,
      phone: data.telNumber,
      password: maskUp,
      email: data.email,
      group: this.currentUser['gid'],
      company: this.currentUser['cpid'],
    });
    this.profileSettingForm.disable();
  }

  onEdit() {
    if(!this.isEdited) {
      this.isEdited = true;
      this.profileSettingForm.enable();
    }
  }

  onSave() {
    Swal.fire({
      title: "Warning",
      text: "Are you sure you want to edit this item?",
      type: "warning",
      ...this.swalConfig,
    }).then((result) => {
      if (result.value) {
        this.onUpdate(this.profileSettingForm.getRawValue());
      }
    });
  }

  onUpdate(model: any) {
    this.isSubmit = true;
    if(this.profileSettingForm.invalid) {
      return;
    }

    this.isLoading = true;
    let user: User = new User();

    user.uid = this.currentUser['uid'];
    user.username = this.currentUser['username'];
    user.firstName = model.firstname;
    user.lastName = model.lastname;
    user.telNumber = model.phone;
    user.email = model.email;
    user.cpid = this.currentUser['cpid'];
    user.gid = this.currentUser['gid'];

    this.userService.updateUserInformation(user).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.status.toLowerCase() === "success") {
          this.disableForm();
          this.processSuccess("Update profile successfully.");
        } else {
          this.processError(res.message);
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.processError("Update profile failure.");
      }
    });
  }

  onCancel() {
    this.isEdited = false;
    this.ngOnInit();
  }

  disableForm() {
    this.isEdited = false;
    this.profileSettingForm.disable();
  }

  processSuccess(message: string) {
    Swal.fire("Success", message, "success").then((result) => {
    });
  }

  processError(message: string) {
    Swal.fire("Error", message, "error");
  }

}
