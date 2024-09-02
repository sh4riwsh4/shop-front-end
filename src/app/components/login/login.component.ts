// src/app/login/login.component.ts
import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule} from "@angular/common";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);
        this.authService.setRole(response.role);
        this.authService.setWallet(response.amount);
        this.authService.setUserId(response.id);
        this.authService.setUsername(this.username);
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = error.error || 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.';
      }
    );
  }
}
