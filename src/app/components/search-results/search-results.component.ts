import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import {Product} from "../../models/products/products";
import {NgForOf, NgIf} from "@angular/common";
import {ProductCardComponent} from "../product-card/product-card.component";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ProductCardComponent
  ],
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  query: string = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.query = params['query'] || '';
      this.searchProducts();
    });
  }

  searchProducts(): void {
    if (this.query) {
      this.productService.searchProducts(this.query).subscribe(products => {
        this.products = products;
      });
    }
  }
}
