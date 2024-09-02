import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import {Product} from "../../models/products/products";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../models/users/users";
import { CATEGORY_MAP } from "../../models/category-map"

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrls: [],
    ownerUsername: '',
    storeName: '',
    categoryId: 1,
  };

  categories = CATEGORY_MAP;

  constructor(private productService: ProductService,
              private router: Router,
              private userService: UserService,
              private authService: AuthService) {}

  ngOnInit() {
    this.setUsername();
  }

  setUsername() {
    const username = this.authService.getUsername();
    if (username) {
      this.userService.getUserByUsername(username).subscribe(
        (user: User) => {
          if (user && user.storeName) {
            this.product.storeName = user.storeName;
            this.product.ownerUsername = username;
          } else {
            console.warn('Kullanıcı adı bulunamadı.');
          }
        },
        (error) => {
          console.error('Kullanıcı bilgileri alınırken hata oluştu:', error);
        }
      );
    } else {
      console.warn('Kullanıcı adı bulunamadı.');
    }
  }

  addImageUrl(url: string) {
    if (url) {
      this.product.imageUrls.push(url);
      console.log('Eklendi:', url);
    }
  }

  onSubmit() {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        console.log('Ürün başarıyla eklendi:', response);
        this.router.navigate(['/my-products']);
      },
      (error) => {
        console.error('Ürün eklenirken hata oluştu:', error);
      }
    );
  }
}
