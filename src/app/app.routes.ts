import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LandingPageComponent} from "./components/landing-page/landing-page.component";
import { AboutComponent} from "./components/about/about.component";
import { ContactComponent} from "./components/contact/contact.component";
import { ProfileComponent} from "./components/profile/profile.component";
import { ProductsComponent} from "./components/products/products.component";
import { ProductDetailComponent} from "./components/product-detail/product-detail.component";
import { SearchResultsComponent} from "./components/search-results/search-results.component";
import { RoleSelectionComponent} from "./components/role-selection/role-selection.component";
import { MyProductsComponent } from "./components/my-products/my-products.component";
import { MyCartComponent } from "./components/my-cart/my-cart.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { OrdersComponent} from "./components/orders/orders.component";
import {SellerGuard} from "./guards/seller.guard";
import {AccessDeniedComponent} from "./components/access-denied/access-denied.component";
import {CustomerGuard} from "./guards/customer.guard";
import {LoggedInGuard} from "./guards/logged-in.guard";
import {logOutGuard} from "./guards/log-out.guard";

export const routes: Routes = [
    { path: 'register/:role', component: RegisterComponent, canActivate: [LoggedInGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]},
    { path: 'role', component: RoleSelectionComponent, canActivate: [LoggedInGuard]},
    { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
    { path: 'home', component: LandingPageComponent },
    { path: 'products' , component: ProductsComponent },
    { path: 'my-products', component: MyProductsComponent, canActivate: [SellerGuard]},
    {path: 'my-cart', component: MyCartComponent, canActivate: [CustomerGuard]},
    { path: 'products/:category', component: ProductsComponent },
    { path: 'product/:id', component: ProductDetailComponent},
    { path: 'add-product', component: AddProductComponent, canActivate: [SellerGuard]},
    { path: 'search/:query', component: SearchResultsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'orders', component: OrdersComponent, canActivate: [logOutGuard]},
    { path: 'profile/:username', component: ProfileComponent },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];
