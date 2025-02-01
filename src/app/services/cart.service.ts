import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Import the AuthService

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://e-commerce-api2.runasp.net/api/Cart';
  private orderApiUrl = 'http://e-commerce-api2.runasp.net/api/Order';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Get the token dynamically
    return new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    });
  }

  // Fetch all products
  getAllProducts(): Observable<any> {
    const url = `${this.apiUrl}/all products`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Add a product to the cart
  addToCart(productId: number, quantity: number): Observable<any> {
    const url = `${this.apiUrl}`;
    const body = { productId, quantity };
    return this.http.post(url, body, {
      headers: this.getHeaders().set('Content-Type', 'application/json'),
    });
  }

  // View the cart
  viewCart(): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Remove a product from the cart
  removeFromCart(cartItemId: number): Observable<any> {
    const url = `${this.apiUrl}/${cartItemId}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }

  // Place an order
  placeOrder(): Observable<any> {
    const url = `${this.orderApiUrl}/place-order`;
    return this.http.post(url, {}, { headers: this.getHeaders() });
  }

  // Fetch order history
  getOrderHistory(): Observable<any> {
    const url = `${this.orderApiUrl}/order-history`;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}