import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-role-selection',
  templateUrl: './role-selection.component.html',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./role-selection.component.css']
})
export class RoleSelectionComponent {
  role: 'ROLE_CUSTOMER' | 'ROLE_SELLER' | null = null;

  constructor(private router: Router) {}

  selectRole(selectedRole: any | null): void {
    this.role = selectedRole;
  }

  onContinue() {
    if (this.role) {
      this.router.navigate(['/register'], { queryParams: { role: this.role } });
    }
  }
}
