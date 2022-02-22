import { Injectable } from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public authservice:AuthService,
              public router:Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    if(this.authservice.isAuthenticated()){
      this.router.navigate(['login'],{ queryParams: {next: state.url}});
      this.authservice.loginStatus.next(false);
      return false;
    }
    return true;
  }
  
}
