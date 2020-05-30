import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UserRegisterSerializer } from '../serializers/user-register-serializer';
import { UserAfterRegisterSerializer } from '../serializers/user-after-register-serializer';
import { ToastController } from '@ionic/angular';
import { UserSignInSerializer } from '../serializers/user-sign-in-serializer';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  basePath: string = 'http://192.168.43.60:8000/users';

  constructor(
    private storage: Storage,
    private router: Router,
    private toastController: ToastController,
    private httpClient: HttpClient
  ) { }

  async toastError(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      console.log(error);

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

    return this.httpClient.post<UserAfterRegisterSerializer>(
      url, 
      JSON.stringify(user),
      httpOptions
    ).pipe(
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

    return this.httpClient.post<UserAfterRegisterSerializer>(
      url, 
      JSON.stringify(user),
      httpOptions
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  saveUserCredential(user: UserAfterRegisterSerializer) {
    this.storage.set('credential', user)
      .then((response) => {
        this.router.navigate(['home']);
      })
  }
}
