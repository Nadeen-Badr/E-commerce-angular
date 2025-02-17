import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://e-commerce-api2.runasp.net/api/Product';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all products
  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      accept: '*/*',
    });
    return this.http.get(this.baseUrl, { headers });
  }
  getSellerProducts(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      accept: '*/*',
    });
    return this.http.get(`${this.baseUrl}/my-products`, { headers });
  }

  // Create a new product
  createProduct(productData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(this.baseUrl, productData, { headers });
  }
  // Fetch product details by ID
  getProductById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      accept: '*/*',
    });
    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }
  editProduct(id: number, productData: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.baseUrl}/${id}`, productData, { headers });
  }
}