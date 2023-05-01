import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    CartComponent,
    ProductDetailsComponent,
    SiteHeaderComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    // AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
      { path: 'product-details/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] },
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
