import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags?:Tag[];
  constructor(private foodservice:FoodService) {
    foodservice.getAllTags().subscribe((data)=>{
      this.tags=data;
    })
  }

  ngOnInit(): void {
  }

}
