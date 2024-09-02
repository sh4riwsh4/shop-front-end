import { Component, Input } from '@angular/core';
import { Order } from '../../models/order/order';
import { Product } from '../../models/products/products';
import {CurrencyPipe, DatePipe, NgIf} from "@angular/common";
import {AuthService} from "../../services/auth/auth.service";
import {OrderPutRequestDto, OrderService} from "../../services/order/order.service";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  standalone: true,
  imports: [
    NgIf,
    CurrencyPipe,
    DatePipe
  ],
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent {
  @Input() order: Order | undefined;
  @Input() product: Product | undefined;
  @Input() role: string | undefined;

  constructor(
    private authService: AuthService,
    private orderService : OrderService
  ) {}

  getStatus(order: Order): string {
    return order.status;
  }

  setOrderStatus(order: Order, orderStatus: string) {
    const orderId = order.id;
    const userId = this.authService.getUserId();
    const orderPutRequestDto: OrderPutRequestDto = { userId: userId, orderStatus: orderStatus };
    this.orderService.setOrderStatus(Number(orderId), orderPutRequestDto).subscribe(
    (response: any) => {
        console.log(response.message);
      },
      (error: any) => {
        console.error('İşlem başarısız:', error);
      }
    );
  }
}
