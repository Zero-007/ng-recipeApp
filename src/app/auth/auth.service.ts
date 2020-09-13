import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
// import {environment} from '../../environments/environment'


interface Response {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}




@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userSubject = new BehaviorSubject<User>(null);
  expirationTimer: any;
  //key = environment.FetchApikey


  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<Response>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUTipjEDqVIG-n0QNaiOIpgIN5bqd1iDE ', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(
      err => {
        if (!err.error || err.error.error) {
          return throwError('An unknown Error occured !!');
        }
        let errorMessage;
        switch (err.error.error.message) {
          case ('EMAIL_EXISTS'):
            errorMessage = 'This email already exist !'
        }
        return throwError(errorMessage);
      }
    ), tap(
      (res) => {
        this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
      }
    ))
  }

  Login(email: string, password: string) {
    return this.http.post<Response>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUTipjEDqVIG-n0QNaiOIpgIN5bqd1iDE ', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe(catchError(
        err => {
          let errorMessage = 'An unknown Error occured !!';
          if (!err.error || err.error.error) {
            return throwError(errorMessage);
          }
          switch (err.error.error.message) {
            case ('EMAIL_EXISTS'):
              errorMessage = 'This email already exist !'
              break;
            case ('EMAIL_NOT_FOUND'):
              errorMessage = 'Enter Email is not valid !'
              break;
            case ('INVALID_PASSWORD'):
              errorMessage = 'Password is incorrect !'
              break;
          }
          return throwError(errorMessage);
        }
      ), tap(
        (res) => {
          this.handleAuthentication(res.email, res.localId, res.idToken, +res.expiresIn)
        }
      ))
  }


  handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      email,
      id,
      token,
      expirationDate
    )
    this.userSubject.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));

  }


  getAuthenticationStatus() {
    console.log("inside a auth function of mine")
    console.log(localStorage.getItem('token'))
    return !!localStorage.getItem('token');

  }

  autoLogin() {
    let userData: {
      email: string; id: string; _token: string; _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      // this.logout();
      return;
    }

    console.log(userData);


    let loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      const expirationTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationTime);
      this.userSubject.next(loadedUser);
    }

  }

  autoLogout(expirationTime: number) {
    console.log(expirationTime);
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationTime)
  }

  logout() {
    this.userSubject.next(null);
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
    localStorage.clear();
    this.router.navigate(['/auth']);

  }
}
