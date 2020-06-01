import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { CredentialSerializer } from '../serializers/credential-serializer';
import { Observable, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CartSerializer, CartPaginateSerializer } from '../serializers/cart-serializer';
import { CartAddSerializer } from '../serializers/cart-add-serializer';
import { CartTotalSerializer } from '../serializers/cart-total-serializer';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CartSummarySerializer } from '../serializers/cart-summary-serializer';

@Injectable({
  providedIn: 'root'
})
export class CartService extends BaseService {
  private behaviorSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private summary: BehaviorSubject<CartSummarySerializer> = new BehaviorSubject<CartSummarySerializer>(new CartSummarySerializer());
  
  constructor(
    private httpClient: HttpClient,
    private platform: Platform,
    private storage: Storage
  ) {
    super();
    this.platform.ready().then(() => {
      this.total();
    })
  }

  all(credential: CredentialSerializer): Observable<CartPaginateSerializer> {
    const url = `${this.baseURL}/carts/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.get<CartPaginateSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  add(credential: CredentialSerializer, cart: CartAddSerializer): Observable<CartSerializer> {
    const url = `${this.baseURL}/carts/add/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.post<CartSerializer>(url, JSON.stringify(cart), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  patch(credential: CredentialSerializer, id: number, cart: CartSerializer): Observable<CartSerializer> {
    const url = `${this.baseURL}/carts/${id}/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.patch<CartSerializer>(url, JSON.stringify({quantity: cart.quantity}), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  get(credential: CredentialSerializer, id: number): Observable<CartSerializer> {
    const url = `${this.baseURL}/carts/${id}/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.get<CartSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  async total(): Promise<any> {
    const credential: CredentialSerializer = await this.storage.get('credential')
    const url = `${this.baseURL}/carts/total/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };
    this.httpClient.get<CartTotalSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
      .subscribe(
        (response: CartSummarySerializer) => {
          // this.behaviorSubject.next(response.item);
          this.summary.next(response);
        },
        (error) => {
          console.log(error);
        }
      )
  }

  delete(credential: CredentialSerializer, id: number): Observable<any> {
    const url = `${this.baseURL}/carts/${id}/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.delete(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getTotal() {
    return this.behaviorSubject.value;
  }

  getSummary() {
    return this.summary.value;
  }
}
