import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent} from "./components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import {filter} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, LandingPageComponent, HeaderComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Semih';

  showHeaderFooter: boolean = true;

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkRoute(event.urlAfterRedirects);
    });
  }

  checkRoute(url: string): void {
    // Define routes where header and footer should not be displayed
    const noHeaderFooterRoutes = ['/login', '/role', '/register?role=ROLE_SELLER', '/register?role=ROLE_CUSTOMER'];
    this.showHeaderFooter = !noHeaderFooterRoutes.includes(url);
  }

}
