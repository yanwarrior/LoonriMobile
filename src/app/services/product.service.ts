import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductPaginateSerializer } from '../serializers/product-paginate-serializer';
import { CredentialSerializer } from '../serializers/credential-serializer';
import { retry, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { ProductSerializer } from '../serializers/product-serializer';
import { BASE_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(
    private httpClient: HttpClient
  ) {
    super();
  }

  getNumber(credential: CredentialSerializer): Observable<{number: string}> {
    const url = `${this.baseURL}/products/get_number/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.post<{number: string}>(url, null, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  all(credential: CredentialSerializer): Observable<ProductPaginateSerializer> {
    let url = `${this.baseURL}/products/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.get<ProductPaginateSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  search(credential: CredentialSerializer, search: string): Observable<ProductPaginateSerializer> {
    let url = `${this.baseURL}/products/`;
    let params: HttpParams = new HttpParams().set('search', search);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      }),
      params
    };

    return this.httpClient.get<ProductPaginateSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  cursor(credential: CredentialSerializer, cursor: string): Observable<ProductPaginateSerializer> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.get<ProductPaginateSerializer>(cursor, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  create(credential: CredentialSerializer, product: ProductSerializer): Observable<ProductSerializer> {
    const url = `${BASE_URL}/products/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };
    return this.httpClient.post<ProductSerializer>(url, JSON.stringify(product), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  get(credential: CredentialSerializer, id: number): Observable<ProductSerializer> {
    const url = `${BASE_URL}/products/${id}/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.get<ProductSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  update(credential: CredentialSerializer, id: number, product: ProductSerializer): Observable<ProductSerializer> {
    const url = `${BASE_URL}/products/${id}/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.put<ProductSerializer>(url, JSON.stringify(product), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  delete(credential: CredentialSerializer, id: number): Observable<any> {
    const url = `${BASE_URL}/products/${id}/`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.delete<any>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
