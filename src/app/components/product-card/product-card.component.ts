import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Product} from "../../models/products/products";
import {getCategoryName} from "../../utils/category-utils";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class ProductCardComponent {
  @Input() product!: Product;
  placeholderImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s';

  getCategoryName(categoryId: number): string {
    return getCategoryName(categoryId);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.placeholderImage;
  }
}
