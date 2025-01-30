import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  imports: [CommonModule,RouterModule,FormsModule, ReactiveFormsModule],
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  productId: number | null = null;
  isLoading: boolean = true;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Get the product ID from the route
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = +id; // Convert string to number
      this.fetchProductDetails(this.productId);
    } else {
      this.errorMessage = 'Product ID is missing.';
      this.isLoading = false;
    }
  }

  fetchProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        // Populate the form with the fetched product details
        this.editProductForm.patchValue(response);
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to fetch product details.';
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.editProductForm.valid && this.productId) {
      const productData = this.editProductForm.value;

      this.productService.editProduct(this.productId, productData).subscribe(
        () => {
          this.successMessage = 'Product updated successfully!';
          this.errorMessage = '';
          setTimeout(() => {
            this.router.navigate(['/product', this.productId]); // Navigate back to product details
          }, 2000); // Redirect after 2 seconds
        },
        (error) => {
          this.errorMessage = 'Failed to update product. Please try again.';
          this.successMessage = '';
        }
      );
    }
  }
}
