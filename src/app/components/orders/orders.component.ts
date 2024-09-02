import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {Order} from "../../models/order/order";
import {Product} from "../../models/products/products";
import {OrderService} from "../../services/order/order.service";
import {ProductService} from "../../services/product/product.service";
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {forkJoin} from "rxjs";
import {OrderCardComponent} from "../order-card/order-card.component";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    NgIf,
    NgForOf,
    OrderCardComponent
  ],
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  products: { [key: number]: Product } = {};

  constructor(private orderService: OrderService, private authService: AuthService, private productService: ProductService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    const userRole = this.authService.getRole();
    if (userId) {
      if (userRole == "ROLE_CUSTOMER") {
        this.orderService.getOrderHistory(userId).subscribe((orders) => {
          this.orders = orders.sort((a, b) => {
            return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
          });
          this.fetchProductDetails();
        });
      } else if (userRole == "ROLE_SELLER") {
        this.orderService.getOrderHistorySeller(userId).subscribe((orders) => {
          this.orders = orders.sort((a, b) => {
            return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
          });
          this.fetchProductDetails();
        });
      }
    }
  }

  fetchProductDetails(): void {
    const productRequests = this.orders.map(order =>
      this.productService.getProductById(order.productId)
    );

    forkJoin(productRequests).subscribe((products: Product[]) => {
      products.forEach(product => {
        this.products[product.id] = product;
      });
    });
  }

  getRole(): string | undefined {
    const role = this.authService.getRole();
    return role !== null ? role : undefined;
  }

  getStatus(order: Order): string {
    return order.status;
  }
}
