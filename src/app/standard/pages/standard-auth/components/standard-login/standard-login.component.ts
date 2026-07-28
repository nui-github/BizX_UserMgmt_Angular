import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StandardLoginForm } from '../../models/standard-auth.model';
import { StandardConfGlobalService } from '../../../../core/services/standard-conf-global.service';
import { CommonModule } from '@angular/common';
import { StandardLoginFormComponent } from '../../../../shared/abstracts/components/standard-login-form/standard-login-form.component';
import { MOCK_CONFIG } from '../../../../core/mock/mock.config';
import { DEFAULT_DEMO_ROLE, DEMO_ACCOUNTS } from '../../../../core/mock/demo-account.config';

@Component({
  selector: 'app-standard-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './standard-login.component.html',
  styleUrl: './standard-login.component.scss'
})
export class StandardLoginComponent extends StandardLoginFormComponent {


  constructor(public confGlobalService: StandardConfGlobalService) {
    super();
    // Prefilled with a mock account for convenience while the mock API layer is on — see core/mock/.
    // Defaults to the company-admin persona; use the profile menu's "switch account" to try platform admin.
    const defaultDemoAccount = DEMO_ACCOUNTS[DEFAULT_DEMO_ROLE];
    this.username = new FormControl(MOCK_CONFIG.enabled ? defaultDemoAccount.username : null, Validators.required);
    this.password = new FormControl(MOCK_CONFIG.enabled ? defaultDemoAccount.password : null, Validators.required);
    this.remember = new FormControl(false);

    this.formGroup = new FormGroup<StandardLoginForm>({
      username: this.username,
      password: this.password,
      // remember: this.remember
    })
  }

  override ngOnInit(): void {
    this.getAllConfig();
  }

  async getAllConfig() {
    return new Promise((resolve) => {
      this.isLoading = true;
      this.confGlobalService.getAllConfig().subscribe({
        next: (res) => {
          this.isLoading = false;
          this.configuration = res.data ? res.data : {};
          resolve(null);
        },
        error: (err) => {
          this.isLoading = false;
          console.log(err);
          resolve(null);
        }
      });
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
