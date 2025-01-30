import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule,CommonModule],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isRegistered: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password, role } = this.registerForm.value;
      this.authService.register({ email, password, role }).subscribe({
        next: (response) => {
          this.isRegistered = true;  // Set to true on success
          console.log(response);
        },
        error: (error) => {
          this.isRegistered = false;  // Set to false on error
          console.error(error);
        },
      });
    }
  }
  goToLogin() {
    this.router.navigate(['/sign-in']); // Update with your actual route
  }
}
