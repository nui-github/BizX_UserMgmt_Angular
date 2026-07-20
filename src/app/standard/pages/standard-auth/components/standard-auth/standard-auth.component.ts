import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { initializeUserSession } from '../../../../shared/helpers/navigation.utils';
import { StandardPermissionService } from '../../../standard-permission/services/standard-permission.service';

@Component({
  selector: 'app-standard-auth',
  standalone: true,
  imports: [],
  templateUrl: './standard-auth.component.html',
  styleUrl: './standard-auth.component.scss'
})
export class StandardAuthComponent {

  isLoading = true;
  isSuccess = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private permissionService: StandardPermissionService,
  ) { }

  ngOnInit(): void {
    this.initiateExternalLogin();
  }

  private initiateExternalLogin(): void {
    try {
      // Initialize external user session from URL
      // const userData: CurrentUser | null = initializeUserSession();
      const userData = initializeUserSession(this.permissionService);
      if (!userData) {
        this.handleError('No user data found in URL parameters or failed to decrypt');
        return;
      }

      this.isSuccess = true;
      this.isLoading = false;

      // Redirect to main application after a short delay
      setTimeout(() => {
        this.router.navigate(['/mainmenu/user']);
      }, 2000);
    } catch (error) {
      console.error('Error processing user data:', error);
      this.handleError('An error occurred while processing user data');
    }
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
    this.isSuccess = false;
  }

  retryProcess(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.isSuccess = false;
    this.initiateExternalLogin();
  }

  closeWindow(): void {
    window.close();
  }
  // ลองเริ่ม external login จากที่นี้
  // ถ้า login สำเร็จ ให้เก็บข้อมูล user ลง session storage
  // แล้ว redirect ไปที่ user management
}
