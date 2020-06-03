import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { CredentialSerializer } from '../serializers/credential-serializer';
import { Observable } from 'rxjs';
import { ItemPaginateSerializer } from '../serializers/item-serializer';
import { AcceptanceSerializer } from '../serializers/acceptance-serializer';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  filter(credential: CredentialSerializer, acceptance: AcceptanceSerializer): Observable<ItemPaginateSerializer> {
    const url = `${this.baseURL}/items/`;
    let params: HttpParams = new HttpParams().set('acceptance', acceptance.id.toString());
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': credential.token
      }),
      params
    };

    return this.httpClient.get<ItemPaginateSerializer>(url, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
