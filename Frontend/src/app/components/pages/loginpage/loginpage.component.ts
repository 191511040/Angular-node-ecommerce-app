import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  loginform!:FormGroup;
  isSubmitted=false;
  returnUrl='';
  constructor(private formbuilder:FormBuilder,private UserService:UserService,private activatedroute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
    this.returnUrl=this.activatedroute.snapshot.queryParams.returnUrl;
  }
  get fc(){
    return this.loginform.controls;
  }
  submit(){
    this.isSubmitted = true;
    if(this.loginform.invalid) return;
    alert(`email:${this.fc.email.value},password:${this.fc.password.value}`)
    this.UserService.login({email:this.fc.email.value,password:this.fc.password.value}).subscribe((data)=>{
      this.router.navigateByUrl(this.returnUrl)
    })

  }

}
