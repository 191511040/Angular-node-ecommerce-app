import { LoadingService } from './../../../services/loading.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit{

  isLoading!:Boolean;
  constructor(private Loadingservice:LoadingService){

    Loadingservice.isLoading.subscribe((isLoading)=>{
      this.isLoading=isLoading
    })



  }

  ngOnInit(){

  }

}
