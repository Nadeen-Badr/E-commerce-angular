import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sellerproducts',
  imports: [CommonModule,RouterModule],
  templateUrl: './sellerproducts.component.html',
  styleUrl: './sellerproducts.component.css'
})
export class SellerproductsComponent {
 products: any[] = []; // Array to store products
  isSeller: boolean = false; 
  constructor(public authService: AuthService, private router: Router,private dialog: MatDialog,private productService: ProductService) {}
  ngOnInit(): void {
    this.isSeller = this.authService.getRole() === 'Seller';
    if (this.isSeller) {
      this.fetchProducts();
    }
  }
  fetchProducts(): void {
    this.productService.getSellerProducts().subscribe(
      (response: any) => {
        this.products = response; // Store the fetched products
      },
      (error) => {
        console.error('Failed to fetch products:', error);
      }
    );
  }
}
