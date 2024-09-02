import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import {Product} from "../../models/products/products";
import {getCategoryName} from "../../utils/category-utils";
import {NgForOf} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  standalone: true,
  imports: [
    NgForOf,
    ProductCardComponent
  ],
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  categories: { id: number, name: string }[] = [];
  productsByCategory: { [key: number]: Product[] } = {};

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe(categoryIds => {
      categoryIds.forEach(categoryId => {
        const categoryName = getCategoryName(categoryId);
        this.categories.push({ id: categoryId, name: categoryName });
        this.productService.getProductsByCategory(categoryId).subscribe(products => {
          this.productsByCategory[categoryId] = products;
        });
      });
    });
  }
}
