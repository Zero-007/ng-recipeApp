import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService , private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // auth logic using observable   
    // return   this.authService.userSubject.pipe(
    //       take(1),         take one will make sure we wont have on going subscription of subject , it will take latest value and then done with it !!
    //     map((data)=>{
    //       return !!data;
    //     })
    //   )
    const authStatus = this.authService.getAuthenticationStatus();
    console.log(authStatus);
    if(authStatus){
      return true
    }
    return this.router.createUrlTree(['/auth']) ;  // this is new way to navigate if condition is false.
  }
  
}
