import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  ROOTURL: string = 'http://localhost:8000/';  
  
  constructor(private http: HttpClient,
              public jwtHelper: JwtHelperService) { }

  public loginStatus = new BehaviorSubject<boolean>(!this.isAuthenticated());

  username:Subject<string> = new Subject();
  updateCurrentLoginUsername(text:string) {
      this.username.next(text);
  }
 

  login(username: string, password: string){
    return this.http.post<any>(this.ROOTURL.concat('account/auth/access-token/login/'),
    { username, password }).pipe(
      map(object =>{
        if (object ){
          this.loginStatus.next(true);
          this.storeToken(object);
          // this.getUserData().subscribe(data=>{ 
          //   this.updateCurrentLoginUsername(data['username'])
          // });
        }
        return object;
      })
    )
  }
  logout(){
    this.loginStatus.next(false);
    return this.http.post<any>(this.ROOTURL.concat('account/auth/logout/'),
    {"token": this.getRefreshToken()}).pipe(
      map(object =>{
        if (object ){
          this.removeStoredToken();
          localStorage.removeItem('username');
        }
        return object;
      })
    )
  }
  forgotPassword(email:String){
    return this.http.post<any>(this.ROOTURL.concat('account/auth/password/reset/'),
    { email}).pipe(
      map(user =>{return user;
      })
    )
  }

  signup(username: string, email: string, password1: string,password2: string){
    return this.http.post<any>(this.ROOTURL.concat('account/auth/signup/'),
    { username, email, password1, password2}).pipe(
      map(user =>{return user;
      })
    )
  }

  paaswordReset(uid:String, token: String,new_password1:String, new_password2:String){
    return this.http.post<any>(this.ROOTURL.concat('account/auth/password/reset/confirm/'),
    {new_password1,new_password2,uid,token}).pipe(
      map(object =>{return object;})
    )
  }
  
  
  private storeToken(object: { token: string; }){
    localStorage.setItem('token', object.token);
  }
  private storeRfreshToken(object: { token: string; }){
    localStorage.removeItem('token');
    localStorage.setItem('token', object.token);
  }
  public RefreshToken() {
    let token = this.getRefreshToken();
    return this.http.post<any>(this.ROOTURL.concat('account/auth/refresh-token/'),
    {token}).pipe(
      map(object =>{
        if (object ){this.storeRfreshToken(object); }
        return object;
      })
    )
  }
  public getRefreshToken() {
    return localStorage.getItem('token');
  }
  public removeStoredToken(){
    localStorage.removeItem('token');
  }
  public isAuthenticated(): boolean{
    const token : any = localStorage.getItem('token');
    return this.jwtHelper.isTokenExpired(token);
  }
  get isLoggedIn() 
  {
    return this.loginStatus.asObservable();
  }

  changePassword(old_password:String, new_password1:String, new_password2:String){
    return this.http.post<any>(this.ROOTURL.concat('account/auth/password/change/'),
    {old_password, new_password1,new_password2}).pipe(
      map(object =>{return object;})
    )
  }


}
