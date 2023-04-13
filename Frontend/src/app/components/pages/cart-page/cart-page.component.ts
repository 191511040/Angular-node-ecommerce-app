import { CartServiceTsService } from './../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/models/cart';
import { CartItem } from 'src/app/shared/models/cartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  cart!:Cart
  constructor(private CartService:CartServiceTsService) {
    this.CartService.getCartObservable().subscribe((cart)=>
    this.cart=cart)
  }

  ngOnInit(): void {
  }
  removeFromCart(cartItem:CartItem){
    this.CartService.removeFromCart(cartItem.food.id);
  }
  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.CartService.changeQuantity(cartItem.food.id, quantity);
  }

}
