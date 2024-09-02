import { Injectable } from '@angular/core';
import { Product } from "../../models/products/products";
import { Observable, of, throwError } from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api';
  private apiUrl = `${this.baseUrl}/products`;

  private products: Product[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  getUserProducts(username: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/user/${username}`)
      .pipe(catchError(this.handleError));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  purchaseProduct(productId: number, userId: number) {
    return this.http.post<string>(`${this.baseUrl}/customer/products/purchase/${productId}/${userId}`, {})
      .pipe(catchError(this.handleError));
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.getProducts().pipe(
      catchError(this.handleError),

      map(products => {
        const lowerCaseQuery = query.toLowerCase();
        return products.filter(product =>
          product.name.toLowerCase().includes(lowerCaseQuery)
        );
      })
    );
  }

  createProduct(product: Product): Observable<Product> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Product>(`${this.baseUrl}/seller/products`, product, {headers});
  }

  getCategories(): Observable<number[]> {
    return this.getProducts().pipe(
      map(products => [...new Set(products.map(product => product.categoryId))]),
      catchError(this.handleError)
    );
  }

  getProductsByCategory(category: number): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.categoryId === category)),
      catchError(this.handleError)
    );
  }

  getProductsBySeller(seller: string | null): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.ownerUsername === seller)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
