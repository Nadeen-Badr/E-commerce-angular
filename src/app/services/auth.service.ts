import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Ensure HttpClient is imported
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://e-commerce-api2.runasp.net/api/Auth';

  constructor(private http: HttpClient) {}  // Inject HttpClient

  register(data: { email: string; password: string; role: 'Buyer' | 'Seller' }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
