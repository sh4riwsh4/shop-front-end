import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/users/users';
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class RegisterComponent implements OnInit {
  username: string = '';
  customerName: string = '';
  customerSurname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  storeName: string = '';
  role: 'ROLE_CUSTOMER' | 'ROLE_SELLER' = 'ROLE_CUSTOMER';
  successMessage: string = '';
  errorMessage: string = '';
  formSubmitted: boolean = false;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const roleParam = params.get('role');
      if (roleParam === 'ROLE_CUSTOMER' || roleParam === 'ROLE_SELLER') {
        this.role = roleParam as 'ROLE_CUSTOMER' | 'ROLE_SELLER';
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  isFieldEmpty(field: string): boolean {
    return !field || field.trim().length === 0;
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.role === 'ROLE_CUSTOMER' && (this.isFieldEmpty(this.customerName) || this.isFieldEmpty(this.customerSurname))) {
      this.errorMessage = "Bu alanlar boş bırakılamaz."
      return;
    }
    if (this.role === 'ROLE_SELLER' && this.isFieldEmpty(this.storeName)) {
      this.errorMessage = "Bu alanlar boş bırakılamaz."
      return;
    }
    if (this.isFieldEmpty(this.username) || this.isFieldEmpty(this.email) || this.isFieldEmpty(this.password) || this.isFieldEmpty(this.confirmPassword)) {
      this.errorMessage = "Bu alanlar boş bırakılamaz."
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Girilen şifreler eşleşmiyor.';
      return;
    }

    if (this.role === 'ROLE_CUSTOMER') {
      const newUser: User = {
        id: 0,
        username: this.username,
        customerName: this.customerName,
        customerSurname: this.customerSurname,
        email: this.email,
        password: this.password,
        role: this.role
      };

      this.authService.register(newUser).subscribe(
        (response) => {
          this.successMessage = 'Kullanıcı başarıyla oluşturuldu!';
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = 'Kullanıcı oluşturulurken bir hata oluştu: ' + error.message;
        }
      );
    } else if (this.role === 'ROLE_SELLER') {
      const newUser: User = {
        id: 0,
        username: this.username,
        email: this.email,
        password: this.password,
        storeName: this.storeName,
        role: this.role,
      };

      this.authService.register(newUser).subscribe(
        (response) => {
          this.successMessage = 'Kullanıcı başarıyla oluşturuldu!';
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = 'Kullanıcı oluşturulurken bir hata oluştu: ' + error.message;
        }
      );
    }
  }
}
