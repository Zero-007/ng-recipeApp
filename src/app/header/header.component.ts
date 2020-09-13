import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy {

  constructor(private dataService:DataStorageService , private authService:AuthService){}

  isAuthenticated = false;
  userSub:Subscription;

  saveData(){
    this.dataService.saveData();
  }

  fetchData(){
    this.dataService.fetchData().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnInit(){
    console.log("oninit of header")
     this.userSub = this.authService.userSubject.subscribe(
       user=>{
         this.isAuthenticated = !!user;
         console.log(this.isAuthenticated);
         console.log('user subscrition in header');
       }
     )
     
  }

  ngOnDestroy(){
   this.userSub.unsubscribe();
  }


}
