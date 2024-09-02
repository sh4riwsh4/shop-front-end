import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';

  constructor(private router: Router) {}

  search(): void {
    if (this.query) {
      this.router.navigate(['/search', this.query]);
    }
  }
}
