import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validators';
import { IUserRegister } from 'src/app/shared/models/Interfaces/IuserRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  isSubmitted=false;

  returnUrl='';
  constructor(private FormBuilder:FormBuilder,private UserService:UserService,private ActivatedRoute:ActivatedRoute,private router:Router){

  }
  ngOnInit():void{

    this.registerForm=this.FormBuilder.group({
     name:['',[Validators.required,Validators.minLength(5)]],
     email:['',[Validators.required, Validators.email]],
     password:['',[Validators.required,Validators.minLength(5)]],
     confirmpassword:['',[Validators.required]],
     address:['',[Validators.required,Validators.minLength(10)]]
    },{
      validators:PasswordsMatchValidator('password','confirmpassword')
    })

    this.returnUrl=this.ActivatedRoute.snapshot.queryParams.returnUrl;

  }
  get fc() {
    return this.registerForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;

    const fv= this.registerForm.value;
    const user :IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    };

    this.UserService.register(user).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl);
    })
  }

}
