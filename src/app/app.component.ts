import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // 
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-new-project';
  showMessage: boolean = false; 
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to login status changes
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  onLogout(): void {
    this.authService.logout();
   // this.isLoggedIn = false; // Update the login status
    this.router.navigate(['/sign-in']); // Redirect to the login page
}
}


