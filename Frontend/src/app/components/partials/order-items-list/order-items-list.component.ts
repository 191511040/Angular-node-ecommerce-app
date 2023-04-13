import { Component, Input, OnInit } from '@angular/core';
import { Orders } from 'src/app/shared/models/Orders';

@Component({
  selector: 'order-items-list',
  templateUrl: './order-items-list.component.html',
  styleUrls: ['./order-items-list.component.css']
})
export class OrderItemsListComponent implements OnInit {

  @Input() orders!:Orders

  constructor(){

  }
  ngOnInit(): void {

  }
}
