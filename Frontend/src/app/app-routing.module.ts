import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginpageComponent } from './components/pages/loginpage/loginpage.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/pages/order-track-page/order-track-page.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'search/:searchTerm',component:HomeComponent},
  {path:'tag/:tag',component:HomeComponent},
  {path:'food/:foodId',component:FoodPageComponent},
  {path:'cart-page',component:CartPageComponent},
  {path:'login',component:LoginpageComponent},
  {path:'register',component:RegisterComponent},
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]},
  {path:'payment',component:PaymentPageComponent,canActivate:[AuthGuard]},
  {path:'track/:orderId',component:OrderTrackPageComponent,canActivate:[AuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
