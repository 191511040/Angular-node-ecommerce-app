import { Orders } from './../../../shared/models/Orders';
import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  order:Orders = new Orders();
  constructor(orderService: OrderService, router: Router) {
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error:() => {
        router.navigateByUrl('/chekcout');
      }
    })

 }
  ngOnInit(): void {
  }

}
