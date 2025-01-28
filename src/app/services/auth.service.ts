import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoggedIn());
  // Observable for components to subscribe to
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private baseUrl = 'http://e-commerce-api2.runasp.net/api/Auth';

  constructor(private http: HttpClient) {}

  // Register method (unchanged)
  register(data: { email: string; password: string; role: 'Buyer' | 'Seller' }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
  checkLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
  // Login method (new)
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(`${this.baseUrl}/login`, body, { headers }).pipe(
      tap((response) => {
        // Save the token to localStorage upon successful login
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.isLoggedInSubject.next(true); // Emit updated login status
        }
      }),
      catchError((error) => {
        // Handle errors (e.g., invalid credentials)
        throw error;
      })
    );
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Method to log out
  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false); // Emit updated login status
  }

  // Method to get the token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // Split the token into its 3 parts (header, payload, signature)
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Extract the role using the claim key
      return payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

}
