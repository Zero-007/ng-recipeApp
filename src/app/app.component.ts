import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements   AfterViewInit , OnInit {
  constructor(private authService:AuthService){}
   show = true;

   ngAfterViewInit(){
    
   }
   ngOnInit(){
    console.log('reload');
    this.authService.autoLogin();
   }

}
