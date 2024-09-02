import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from "../../services/auth/auth.service";
import { CommonModule } from "@angular/common";
import {SearchComponent} from "../search/search.component";
import {WalletService} from "../../services/wallet/wallet.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  dropdownOpen = false;
  searchOpen = false;

  constructor(private authService: AuthService, private router: Router, private walletService: WalletService) {}

  ngOnInit(): void {
    this.walletService.walletUpdated$.subscribe(() => {
      const userId = this.authService.getUserId();
      if (userId) {
        this.walletService.setWallet(Number(userId)).subscribe(
          (response: any) => {
            console.log(response.message + response.amount);
            this.authService.setWallet(response.amount);
            this.getWallet()
          },
          (error: any) => {
            console.error('Cüzdan güncellenemedi:', error);
          }
        );
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername(): string | null {
    return this.authService.getUsername();
  }

  getRole(): string | null {
    return this.authService.getRole();
  }

  getWallet(): string | null {
    return this.authService.getWallet();
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }
}
