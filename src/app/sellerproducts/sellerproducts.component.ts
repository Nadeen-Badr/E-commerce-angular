import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sellerproducts',
  imports: [CommonModule,RouterModule],
  templateUrl: './sellerproducts.component.html',
  styleUrl: './sellerproducts.component.css'
})
export class SellerproductsComponent {
  private http = inject(HttpClient);
  showModal: boolean = false;  // Controls modal visibility
  productIdToDelete: number | null = null;
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

  // Function to show modal
  confirmDelete(productId: number) {
    this.productIdToDelete = productId;
    this.showModal = true;
  }

  // Cancel delete
  cancelDelete() {
    this.showModal = false;
  }

  // Function to delete the product
  deleteProduct(productId: number) {
    this.http.delete(`http://e-commerce-api2.runasp.net/api/Product/${productId}`, {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        accept: '*/*',
      },
    }).subscribe({
      next: () => {
        this.showModal = false;
        this.showToast('Product deleted successfully!', 'success');
        this.router.navigate(['/products']);  // Adjust route if needed
      },
      error: (err) => {
        this.showModal = false;
        this.showToast('An error occurred while deleting the product.', 'error');
      }
    });
  }

  // Toast Notification function
  showToast(message: string, type: 'success' | 'error') {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    if (type === 'error') toast.classList.add('error');
    toast.textContent = message;
  
    document.body.appendChild(toast);
  
    // Show and hide toast
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      document.body.removeChild(toast);
    }, 3000);
  }
}
