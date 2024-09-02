import { Component, Input, OnInit } from '@angular/core';
import {CommentService} from "../../services/comment/comment.service";
import {Comment} from "../../models/comment/comment";
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {OrderService} from "../../services/order/order.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Component({
  selector: 'app-comments',
  templateUrl: './comment.component.html',
  standalone: true,
  imports: [
    StarRatingComponent,
    NgForOf,
    DatePipe,
    NgIf,
    FormsModule
  ],
  styleUrls: ['./comment.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() productId!: number;
  comments: Comment[] = [];
  checkComments: any[] = [];
  newComment: Comment = new Comment(0, 0, '', '', new Date().toISOString(), 2.5);
  averageRating: number = 0;
  canComment : boolean = true;
  ratingError: boolean = false;
  errorMessage = ''

  constructor(private commentService: CommentService, private authService: AuthService, private orderService: OrderService) {}

  ngOnInit(): void {
    this.commentService.getCommentsByProductId(this.productId).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
        this.calculateAverageRating();
      },
      (error) => {
        this.errorMessage = error;
        console.error('Error fetching comments:', error);
      }
    );
    this.newComment.productId = this.productId;
    this.checkIfCommented().subscribe((hasCommented) => {
      this.canComment = !hasCommented;
    });
  }

  checkIfPurchased(): void {
    const userId = this.authService.getUserId();
    let checker: boolean = false;

    this.orderService.getOrderHistory(userId).subscribe((orders) => {
      orders.forEach(order => {
        if ((order.productId === this.productId) && !checker && order.status == "ACTIVE") {
          this.submitComment();
          checker = true;
        }
      });

      if (!checker) {
        this.errorMessage = 'Yorum yapabilmek için ürünü satın almalısın.';
        console.error('Yorum yapabilmek için ürünü satın almalısın.');
      }
    });
  }

  checkIfCommented(): Observable<boolean> {
    const productId = this.productId;
    const username = this.authService.getUsername();

    return this.commentService.getUserComments(username).pipe(
      map((comments) => {
        this.checkComments = comments || [];
        return comments.some(comment => comment.productId === productId);
      }),
      catchError((error) => {
        console.error('Error fetching comments:', error);
        this.checkComments = [];
        return of(false);
      })
    );
  }

  submitComment() {
    this.newComment.id = this.comments.length + 1;
    this.newComment.date = new Date().toISOString();
    this.newComment.author = this.authService.getUsername();
    this.commentService.addComment(this.newComment).subscribe(() => {
      this.commentService.getCommentsByProductId(this.productId).subscribe(
        (comments: Comment[]) => {
          this.comments = comments;
          this.newComment = new Comment(0, this.productId, '', '', new Date().toISOString(), 0);
          this.calculateAverageRating();
        },
        (error) => {
          this.errorMessage = error;
          console.error('Error fetching comments:', error);
        }
      );
    }, (error) => {
      this.errorMessage = error;
      console.error('Error adding comment:', error);
    });
  }

  calculateAverageRating() {
    if (this.comments.length > 0) {
      const totalRating = this.comments.reduce((sum, comment) => sum + comment.rating, 0);
      this.averageRating = totalRating / this.comments.length;
    } else {
      this.averageRating = 0;
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
