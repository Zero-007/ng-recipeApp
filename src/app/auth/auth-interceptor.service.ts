import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService:AuthService) { }

  intercept(req:HttpRequest<any>,next:HttpHandler){
     console.log("auth intrceptor");
    if(this.authService.getAuthenticationStatus()){
      let modifiedReq = req.clone({
        params:req.params.append('auth',localStorage.getItem('token'))
      })
      return next.handle(modifiedReq);
    }

    return next.handle(req);

  }
}
