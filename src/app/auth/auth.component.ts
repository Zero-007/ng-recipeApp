import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/place-holder.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit,OnDestroy {
   isLogin = true;
   isLoading = false;
   errorMsg=null;
   closeSub:Subscription;
   @ViewChild(PlaceHolderDirective,{static:false}) viewRef:PlaceHolderDirective;
   
  constructor(private authService:AuthService , private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.isLogin = true;
    this.errorMsg = null;
    this.isLoading=false;
    
  }

  onSwitchMode(){
    this.isLogin = !this.isLogin;
  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }
    const email = form.value.email;
    const password  = form.value.password;
    this.isLoading = true;
    if(this.isLogin){

      this.authService.Login(email,password).subscribe(
        res=>{
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        } ,
        errMessage=>{
          console.log(errMessage);
          this.errorMsg = errMessage;
          this.showErrorAlert(this.errorMsg)
          this.isLoading = false;
         
        }
      )
      
    }else{
      this.authService.signUp(email,password).subscribe(
        res=>{
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        } ,
        errMessage=>{
          console.log(errMessage);
          this.errorMsg = errMessage;
          this.showErrorAlert(this.errorMsg)
          this.isLoading = false;
          
        }
      )
    }
    form.reset();
  }

  clearError(){
    this.errorMsg=null;
  }

  private showErrorAlert(message:string){
   const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
   this.viewRef.viewContainerRef.clear();
   const alertComp = this.viewRef.viewContainerRef.createComponent(alertFactory);

    alertComp.instance.message = message;

   this.closeSub= alertComp.instance.close.subscribe(()=>{
       this.closeSub.unsubscribe()
       this.clearError()
      this.viewRef.viewContainerRef.clear()
    })

  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }

  }

}
