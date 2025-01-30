import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [CommonModule,FormsModule],
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Navigate to the home page or dashboard after successful login
        this.router.navigate(['/']);
      },
      (error) => {
        // Handle login error
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    );
  }
  goToRegister() {
    this.router.navigate(['/register']); // Update with your actual route
  }
}