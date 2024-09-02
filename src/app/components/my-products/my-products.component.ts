import { Component } from '@angular/core';
import {Product} from "../../models/products/products";
import {ProductService} from "../../services/product/product.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";

@Component({
  selector: 'app-my-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ProductCardComponent,
    TitleCasePipe,
    RouterLink
  ],
  templateUrl: './my-products.component.html',
  styleUrl: './my-products.component.css'
})
export class MyProductsComponent {
  products: Product[] = [];

  constructor(private productService: ProductService,
              private router : Router,
              private authService : AuthService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const sellerUsername = this.authService.getUsername();
    this.productService.getProductsBySeller(sellerUsername).subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Ürünler yüklenirken hata oluştu:', error);
      }
    );
  }
}
