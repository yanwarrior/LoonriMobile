import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { CredentialSerializer } from '../serializers/credential-serializer';
import { AcceptanceSerializer, AcceptancePaginateSerializer } from '../serializers/acceptance-serializer';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcceptanceService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  create(credential: CredentialSerializer, acceptance: AcceptanceSerializer): Observable<AcceptanceSerializer> {
    const url = `${this.baseURL}/acceptances/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.post<AcceptanceSerializer>(url, JSON.stringify(acceptance), httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getNumber(credential: CredentialSerializer): Observable<{number: string}> {
    const url = `${this.baseURL}/acceptances/get_number/`;
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

  search(credential: CredentialSerializer, search: string, status: string): Observable<AcceptancePaginateSerializer> {
    const url = `${this.baseURL}/acceptances/`;
    const params: HttpParams = new HttpParams().set('search', search).set('status', status);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      }),
      params
    };

    return this.httpClient.get<AcceptancePaginateSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  all(credential: CredentialSerializer): Observable<AcceptancePaginateSerializer> {
    const url = `${this.baseURL}/acceptances/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.get<AcceptancePaginateSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  filter(credential: CredentialSerializer, status: string): Observable<AcceptancePaginateSerializer> {
    const url = `${this.baseURL}/acceptances/`;
    const params: HttpParams = new HttpParams().set('status', status)
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      }),
      params
    };

    return this.httpClient.get<AcceptancePaginateSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  cursor(credential: CredentialSerializer, cursor: string): Observable<AcceptancePaginateSerializer> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.get<AcceptancePaginateSerializer>(cursor, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  cartToItem(credential: CredentialSerializer, id: number): Observable<AcceptanceSerializer> {
    const url = `${this.baseURL}/acceptances/${id}/cart_to_item/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.post<AcceptanceSerializer>(url, null, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  completed(credential: CredentialSerializer, id: number): Observable<AcceptanceSerializer> {
    const url = `${this.baseURL}/acceptances/${id}/completed/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.post<AcceptanceSerializer>(url, null, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  taked(credential: CredentialSerializer, id: number): Observable<AcceptanceSerializer> {
    const url = `${this.baseURL}/acceptances/${id}/taked/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.post<AcceptanceSerializer>(url, null, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  get(credential: CredentialSerializer, id: number): Observable<AcceptanceSerializer> {
    const url = `${this.baseURL}/acceptances/${id}/`;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      })
    };

    return this.httpClient.get<AcceptanceSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}
