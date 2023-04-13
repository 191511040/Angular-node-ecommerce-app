import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods:Food[]=[];
  constructor(private foodService:FoodService,activatedRoute:ActivatedRoute) {

    activatedRoute.params.subscribe((params)=>{
      if(params.searchTerm){
        this.foodService.getAllFoodsBySearchTerm(params.searchTerm).subscribe((data)=>{
          this.foods=data;
        });
      }
      else if(params.tag){
         this.foodService.getAllFoodsByTag(params.tag).subscribe((data)=>{
          this.foods=data;
      })
    }
      else{
       foodService.getAll().subscribe((data)=>{
        this.foods=data;
       });

      }
    })

   }

  ngOnInit(): void {
  }

}
