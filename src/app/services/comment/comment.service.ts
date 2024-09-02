import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, mergeMap, Observable, of, reduce, switchMap} from 'rxjs';
import { Comment } from '../../models/comment/comment';
import {map} from "rxjs/operators";
import {Product} from "../../models/products/products";
import {ProductService} from "../product/product.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/api/customer/comments';
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient,
              private productService: ProductService,) {}

  private products: Product[] = [];


  getCommentsByProductId(productId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/product/${productId}`);
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.baseUrl, comment);
  }

  getUserComments(username: string | null): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/author/${username}`);
  }

  getAverageRatingForSeller(sellerId: string): Observable<number> {
    return this.productService.getProductsBySeller(sellerId).pipe(
      mergeMap(products => {
        if (products.length === 0) {
          return of([]);
        }
        return forkJoin(products.map(product => this.getCommentsByProductId(product.id)));
      }),
      mergeMap(commentsArray => commentsArray.flat()),
      reduce((acc, comment) => {
        acc.sum += comment.rating;
        acc.count += 1;
        return acc;
      }, { sum: 0, count: 0 }),
      map(({ sum, count }) => (count > 0 ? sum / count : 0))
    );
  }
}
