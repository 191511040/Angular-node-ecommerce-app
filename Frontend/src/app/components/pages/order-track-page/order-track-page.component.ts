import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Orders } from 'src/app/shared/models/Orders';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrls: ['./order-track-page.component.css']
})
export class OrderTrackPageComponent {

  order!:Orders;
  constructor(activatedRoute: ActivatedRoute,
    orderService:OrderService){
      const params = activatedRoute.snapshot.params;
     if(!params.orderId) return;

     orderService.trackOrderById(params.orderId).subscribe(order => {
       this.order = order;
     })

  }
  ngOnInit(): void {
  }

}

