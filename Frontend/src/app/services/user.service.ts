import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject, Observable, tap, window } from 'rxjs';
import { USER_LOGIN, USER_REGISTER } from '../shared/models/constants/urs';
import { IUserLogin } from '../shared/models/Interfaces/IUserLogin';
import { IUserRegister } from '../shared/models/Interfaces/IuserRegister';
import { User } from '../shared/models/user';
const USER_KEY='User'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject= new BehaviorSubject<User>(this.getuserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) {
    this.userObservable=this.userSubject.asObservable();
   }

   public get currentUser():User{
    return this.userSubject.value;

   }
   login(userLogin:IUserLogin):Observable<User>{
      return this.http.post<User>(USER_LOGIN,userLogin).pipe(tap({
        next:(user)=>{
          this.setusertoLocalStorage(user)
          this.userSubject.next(user);
          this.toastrService.success(`welcome to Foodmine ${user.name}`,'Login Successful')
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error,'Login failed')

        },

      }))
   }
   register(userRegister:IUserRegister):Observable<User>{
     return this.http.post<User>(USER_REGISTER,userRegister).pipe(tap({
      next:(user)=>{
        this.setusertoLocalStorage(user)
        this.userSubject.next(user);
        this.toastrService.success(`
        welcome to the foodmine ${user.name}`,'Register Successful',
        )
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error,
          'Register Failed')
      }
     }))
   }
   logout(){
     this.userSubject.next(new User());
     localStorage.removeItem(USER_KEY);
     location.reload()
   }
   private setusertoLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
   }
   private getuserFromLocalStorage():User{
    const userJson=localStorage.getItem(USER_KEY)
    if(userJson){
      return JSON.parse(userJson) as User
    }
    return new User();
   }
}
