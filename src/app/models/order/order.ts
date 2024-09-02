export interface Order {
  id: number;
  productName: string;
  price: number;
  orderDate: string;
  status: string;
  customerId: number,
  sellerId: number,
  productId: number
}
