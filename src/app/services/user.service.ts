import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UserRegisterSerializer } from '../serializers/user-register-serializer';
import { UserAfterRegisterSerializer } from '../serializers/user-after-register-serializer';
import { ToastController, Platform } from '@ionic/angular';
import { UserSignInSerializer } from '../serializers/user-sign-in-serializer';
import { Router } from '@angular/router';
import { BASE_URL } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  basePath: string = `${BASE_URL}/users`;
  authState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private router: Router,
    private toastController: ToastController,
    private platform: Platform,
    private httpClient: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.ifSignedIn();
    });
  }

  async toastError(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  setAuthState(condition: boolean) {
    this.authState.next(condition);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return throwError(error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
      return throwError(`${error.error.type} ${error.error.fallback_message}`);
    }
  };

  register(user: UserRegisterSerializer): Observable<UserAfterRegisterSerializer> {
    let url = `${this.basePath}/register/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<UserAfterRegisterSerializer>(url, JSON.stringify(user), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  signIn(user: UserSignInSerializer): Observable<UserAfterRegisterSerializer> {
    let url = `${this.basePath}/sign_in/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<UserAfterRegisterSerializer>(url, JSON.stringify(user), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  saveUserCredential(user: UserAfterRegisterSerializer) {
    this.storage.set('credential', user)
      .then((response) => {
        this.router.navigate(['product-list']);
      });
  }

  ifSignedIn() {
    this.storage.get('credential').then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  signOut() {
    this.storage.remove('credential').then(() => {
      this.router.navigate(['sign-in']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
