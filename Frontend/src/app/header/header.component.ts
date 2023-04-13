
import { CartServiceTsService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  CartQuantity=0;
  user!:User;
  constructor(cartservice:CartServiceTsService,private userService:UserService) {
    cartservice.getCartObservable().subscribe((data)=>{
      this.CartQuantity=data.totalCount
    })
    userService.userObservable.subscribe((newuser)=>{
     this.user=newuser;
    })
  }
  logout(){
   this.userService.logout()
  }
  get isAuth(){
    return this.user.token;
  }

  ngOnInit(): void {
  }



}
