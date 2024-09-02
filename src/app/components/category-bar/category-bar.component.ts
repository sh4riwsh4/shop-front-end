import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from "@angular/common";
import {CATEGORY_MAP} from "../../models/category-map";

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent {
  categories = CATEGORY_MAP

  constructor(private router: Router) {}

  navigateToCategory(categoryId?: number): void {
    if (categoryId === undefined) {
      this.router.navigate(['/products']);
    } else {
      const category = this.categories.find(cat => cat.id === categoryId);
      if (category) {
        this.router.navigate(['/products', category.name.toLowerCase()]);
      }
    }
  }
}
