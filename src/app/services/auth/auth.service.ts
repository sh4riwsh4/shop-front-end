import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {LoginResponse} from "../../models/login-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private userRole: 'ROLE_CUSTOMER' | 'ROLE_SELLER' | null = null;

  constructor(private http: HttpClient,
              @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedRole = localStorage.getItem('userRole');
      this.userRole = storedRole as 'ROLE_CUSTOMER' | 'ROLE_SELLER' | null;
    }
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(user: { username: string; password: string; email: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwtToken', token);
    }
  }

  setUsername(username: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('jwtUsername', username);
    }
  }

  setUserId(id: number){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userId', String(id));
    }
  }

  setRole(role: 'ROLE_CUSTOMER' | 'ROLE_SELLER') {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userRole', role);
      this.userRole = role;
    }
  }

  setWallet(amount: number){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userWallet', String(amount));
    }
  }

  getWallet(){
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userWallet');
    }
    return null;
  }

  getRole(): 'ROLE_CUSTOMER' | 'ROLE_SELLER' | null {
    return this.userRole;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwtToken');
    }
    return null;
  }

  getUsername(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('jwtUsername');
    }
    return null;
  }

  getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userId');
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwtToken');
      this.userRole = null;
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
      localStorage.removeItem('userWallet');
      localStorage.removeItem('userId');
    }
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
