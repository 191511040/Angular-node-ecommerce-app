import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartServiceTsService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  food!:Food;
  constructor(activatedroute:ActivatedRoute,foodservice:FoodService,private cartservice:CartServiceTsService,private router:Router) {
    activatedroute.params.subscribe((params)=>{
      if(params.foodId){
        foodservice.getFoodById(params.foodId).subscribe((data)=>{
          this.food=data
        })
      }
    })
  }

  ngOnInit(): void {
  }
  addTocart():void{
    this.cartservice.addToCart(this.food)
    this.router.navigateByUrl('/cart-page')

  }

}
