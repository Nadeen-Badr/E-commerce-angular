import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // 
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from './create-product/create-product.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  products: any[] = []; // Array to store products
  isSeller: boolean = false;
  title = 'my-new-project';
  showMessage: boolean = false; 
  isLoggedIn: boolean = false;
  constructor(public authService: AuthService, private router: Router,private dialog: MatDialog,private productService: ProductService) {}
  openCreateProductModal(): void {
    this.dialog.open(CreateProductComponent, {
      width: '500px',
      panelClass: 'custom-dialog'
    });
  }
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      // If the user is not logged in, redirect to the register page
      this.router.navigate(['/register']);
    }
    this.isSeller = this.authService.getRole() === 'Seller';
    if (this.isSeller) {
      this.fetchProducts();
    }
    // Subscribe to login status changes
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response; // Store the fetched products
      },
      (error) => {
        console.error('Failed to fetch products:', error);
      }
    );
  }
  viewProducts() {
    this.router.navigate(['/products']);
  }
  viewMyProducts() {
    this.router.navigate(['/my-products']);
  }

  onLogout(): void {
    this.authService.logout();
   // this.isLoggedIn = false; // Update the login status
    this.router.navigate(['/sign-in']); // Redirect to the login page
}
buy(){
  this.router.navigate(['/buy']);
}
}


