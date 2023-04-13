
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/models/Orders';
import { CartServiceTsService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  orders:Orders=new Orders();
  checkOutForm!:FormGroup
  constructor(Cartservice:CartServiceTsService,private router:Router, private FormBuilder:FormBuilder,private userservice:UserService,private toastrservice:ToastrService,private orderservice:OrderService){
    const cart=Cartservice.getCart();
    this.orders.items=cart.items;
    this.orders.totalPrice=cart.totalPrice
 }

 ngOnInit(){
  let {name,address}=this.userservice.currentUser;
  this.checkOutForm=this.FormBuilder.group({
     name:[name,Validators.required],
     address:[address,Validators.required]
  })
 }

 get fc(){
  return this.checkOutForm.controls;
 }
 createOrder(){
  if(this.checkOutForm.invalid){
    this.toastrservice.warning('please fill the inputs','Invalid Inputs');
    return;
  }
  if(!this.orders.addressLatLng){
    this.toastrservice.warning('please select your location on the map');
    return;
  }
   this.orders.name=this.fc.name.value;
   this.orders.address=this.fc.address.value;

   this.orderservice.create(this.orders).subscribe({
    next:() => {
      this.router.navigateByUrl('/payment');
    },
    error:(errorResponse) => {
      this.toastrservice.error(errorResponse.error, 'Cart');
    }
  })

 }
}
