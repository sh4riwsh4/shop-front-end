import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Order} from '../../models/order/order';

export interface OrderRequestDto {
  productId: number;
  date: Date;
}

export interface OrderResponseDto {
  message: string;
}

export interface OrderPutRequestDto {
  userId: string | null;
  orderStatus: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl: string = 'http://localhost:8080/api/customer/orders';
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getOrderHistory(userId: string | null): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/${userId}`);
  }

  getOrderHistorySeller(userId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/seller/${userId}`);
  }

  createOrder(userId: number, orderRequestDto: OrderRequestDto): Observable<OrderResponseDto> {
    return this.http.post<OrderResponseDto>(`${this.baseUrl}/${userId}`, orderRequestDto);
  }

  setOrderStatus(orderId: number, orderPutRequestDto: OrderPutRequestDto): Observable<OrderResponseDto> {
    return this.http.put<OrderResponseDto>(`${this.baseUrl}/${orderId}`, orderPutRequestDto);
  }
}
