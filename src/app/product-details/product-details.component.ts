import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
   imports: [CommonModule],
})
export class ProductDetailsComponent implements OnInit {
  product: any = null; // Object to store product details
  isLoading: boolean = true; // Loading state
  errorMessage: string = ''; // Error message

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Get the product ID from the route
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.fetchProductDetails(+productId); // Convert string to number
    } else {
      this.errorMessage = 'Product ID is missing.';
      this.isLoading = false;
    }
  }

  fetchProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.product = response; // Store the product details
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch product details.';
        this.isLoading = false;
      }
    );
  }
}