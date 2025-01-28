// create-product.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { ReactiveFormsModule } from '@angular/forms'; // Import this module

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
})
export class CreateProductComponent {
  productForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json',
      });

      this.http
        .post('http://e-commerce-api2.runasp.net/api/Product', productData, { headers })
        .subscribe(
          (response) => {
            this.successMessage = 'Product created successfully!';
            this.errorMessage = '';
            this.productForm.reset(); // Clear the form
          },
          (error) => {
            this.errorMessage = 'Failed to create product. Please try again.';
            this.successMessage = '';
          }
        );
    }
  }
}