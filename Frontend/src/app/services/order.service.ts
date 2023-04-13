import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from './../shared/models/constants/urs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Orders } from '../shared/models/Orders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  create(Order:Orders){
   return this.http.post<Orders>(ORDER_CREATE_URL,Order)
  }
  getNewOrderForCurrentUser():Observable<Orders>{
    return this.http.get<Orders>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }
  pay(order:Orders):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL,order);
  }
  trackOrderById(id:number): Observable<Orders>{
    return this.http.get<Orders>(ORDER_TRACK_URL + id);
  }
}
