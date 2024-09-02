import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/products/products";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProductService} from "../../services/product/product.service";
import {CategoryBarComponent} from "../category-bar/category-bar.component";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CATEGORY_MAP} from "../../models/category-map";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, CategoryBarComponent, ProductCardComponent],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categoryName: string | undefined;

  constructor(private productService: ProductService,private router : Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProducts()
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.route.params.subscribe(params => {
          const category = params['category'];
          if (category) {
            this.categoryName = category;
            const categoryId = this.getCategoryId(category);
            this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
          } else {
            this.categoryName = undefined;
            this.filteredProducts = this.products; // Tüm ürünleri göster
          }
        });
      },
      (error) => {
        console.error('Ürünler yüklenirken hata oluştu:', error);
      }
      );
  }

  getCategoryId(categoryName: string): number {
    const category = CATEGORY_MAP.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
    return category ? category.id : -1;
  }
}
