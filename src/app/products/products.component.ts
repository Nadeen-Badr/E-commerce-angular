import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // 
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';

import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-products',
  
  imports: [CommonModule,RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
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
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response; // Store the fetched products
      },
      (error) => {
        console.error('Failed to fetch products:', error);
      }
    );
  }
}