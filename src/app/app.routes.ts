import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProductsComponent } from './products/products.component';
import { SellerproductsComponent } from './sellerproducts/sellerproducts.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
export const routes: Routes = [ { path: 'register', component: RegisterComponent },
    {path: 'sign-in', component: SignInComponent},
    { path: 'products', component: ProductsComponent },
    {path: 'my-products', component: SellerproductsComponent },
    {
        path: 'product/:id', // Dynamic route with :id parameter
        component: ProductDetailsComponent,
      },
      { path: 'edit-product/:id', component: EditProductComponent },];
