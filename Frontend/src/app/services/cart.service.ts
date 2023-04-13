import { CartItem } from './../shared/models/cartItem';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/cart';

import { Food } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class CartServiceTsService {

  private Cart:Cart=this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart>= new BehaviorSubject(this.Cart);
  constructor() { }

  addToCart(food:Food):void{
    let cartItem = this.Cart.items
      .find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.Cart.items.push(new CartItem(food));
    this.setCartToLocalStorage()

  }

  removeFromCart(foodId:string){
    this.Cart.items = this.Cart.items
    .filter(item => item.food.id != foodId);
  }
  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.Cart.items
      .find(item => item.food.id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage()

  }
  clearCart() {
    this.Cart = new Cart();
    this.setCartToLocalStorage()

  }
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
  getCart():Cart{
   return this.cartSubject.value;
  }

  private setCartToLocalStorage():void{
    this.Cart.totalPrice=this.Cart.items.reduce((prevSum,CurrentItem)=>prevSum+CurrentItem.price,0)
    this.Cart.totalCount = this.Cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson=JSON.stringify(this.Cart)
    localStorage.setItem('cart',cartJson)
    this.cartSubject.next(this.Cart)

  }
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

}
