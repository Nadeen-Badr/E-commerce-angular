import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductsComponent } from './products/products.component';
import { SellerproductsComponent } from './sellerproducts/sellerproducts.component';
export const routes: Routes = [ { path: 'register', component: RegisterComponent },
    {path: 'sign-in', component: SignInComponent},
    { path: 'products', component: ProductsComponent },
    {path: 'my-products', component: SellerproductsComponent }];
