import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Product} from "../../models/products/products";
import {ProductService} from "../../services/product/product.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {StarRatingComponent} from "../star-rating/star-rating.component";
import {CommentsComponent} from "../comment/comment.component";
import {CommentService} from "../../services/comment/comment.service";
import {Comment} from "../../models/comment/comment";
import {AuthService} from "../../services/auth/auth.service";
import {WalletService} from "../../services/wallet/wallet.service";
import {OrderRequestDto, OrderResponseDto, OrderService} from "../../services/order/order.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, StarRatingComponent, CommentsComponent],
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  placeholderImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s';

  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private commentService: CommentService,
    private authService: AuthService,
    private walletService: WalletService,
    private orderService: OrderService,
    ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      },
      (error) => {
        console.error('Ürün detayları yüklenirken hata oluştu:', error);
      }
    );
    this.loadComments(id);
  }

  loadComments(id: number): void {
    this.commentService.getCommentsByProductId(id).subscribe(comments => {
      this.comments = comments;
      this.comments = comments || [];
    });
  }

  currentImageIndex = 0;

  prevImage() {
    if (this.product) {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.product.imageUrls.length - 1;
      }
    }
  }

  nextImage() {
    if (this.product) {
      if (this.currentImageIndex < this.product.imageUrls.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    }
  }

  addToCart(product: Product): void {
    console.log(`${product.name} added to cart!`);
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.placeholderImage;
  }

  buyNow(product: Product) {
    const userId = this.authService.getUserId();
    this.productService.purchaseProduct(product.id, Number(userId)).subscribe(
      (response: any) => {
        console.log(response.message);
        if (response.message == "Product purchased successfully"){

          this.walletService.notifyWalletUpdated();

          const orderRequest: OrderRequestDto = {productId: product.id, date: new Date()};

          this.orderService.createOrder(Number(userId), orderRequest).subscribe(
            (response: OrderResponseDto) => {
              console.log(response.message);
              alert(response.message);
            },
            (error) => {
              console.error('Sipariş oluşturulurken hata oluştu:', error);
              alert('Sipariş oluşturulurken bir hata oluştu.');
            }
          );
        }
      },
      (error: any) => {
        console.error('Satın alma işlemi başarısız:', error);
      }
    );
  }

  getRole(): string | null {
    return this.authService.getRole();
  }
}
