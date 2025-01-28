import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // 
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from './create-product/create-product.component';

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
  constructor(public authService: AuthService, private router: Router,private dialog: MatDialog) {}
  openCreateProductModal(): void {
    this.dialog.open(CreateProductComponent, {
      width: '500px',
    });
  }
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


