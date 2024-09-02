import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {User} from "../../models/users/users";
import {CommonModule} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Product} from "../../models/products/products";
import {ProductService} from "../../services/product/product.service";
import {ProductCardComponent} from "../product-card/product-card.component";
import {CommentService} from "../../services/comment/comment.service";
import {Observable} from "rxjs";
import {StarRatingComponent} from "../star-rating/star-rating.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink, StarRatingComponent],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User| undefined;
  products: Product[] | undefined;
  topProducts: Product[] = [];
  errorMessage: string = '';
  averageRating: number = 0;
  placeholderImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWz9tftw9qculFH1gxieWkxL6rbRk_hrXTSg&s';

  constructor(private userService: UserService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private route: ActivatedRoute,
              private productService: ProductService,
              private commentService: CommentService) {}

  ngOnInit(): void {
    const username = String(this.route.snapshot.paramMap.get('username'));
    this.userService.getUserByUsername(username).subscribe(
      (user: User) => {
        this.user = user;
        if (this.user.role === 'ROLE_SELLER') {
          this.loadTopProducts(username)
          this.commentService.getAverageRatingForSeller(username).subscribe(
            average => this.averageRating = average
          );
        }
      },
      (error) => {
        this.errorMessage = 'Kullanıcı bilgileri alınırken bir hata oluştu: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = this.placeholderImage;
  }

  loadTopProducts(username: string): void {
    this.productService.getUserProducts(username).subscribe(
      (products: Product[]) => {
        this.products = products;
        this.topProducts = this.getTopProductsById(this.products);
        console.log(this.topProducts);
      },
      (error) => {
        this.errorMessage = 'Ürünler alınırken bir hata oluştu: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  getTopProductsById(products: Product[]): Product[] {
    return products
      .sort((a, b) => b.id - a.id)
      .slice(0, 3);
  }
}
