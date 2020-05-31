import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { CredentialSerializer } from '../serializers/credential-serializer';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private CREDENTIAL = 'credential';

  constructor(private storage: Storage) { }

  async getCredential(): Promise<CredentialSerializer> {
    const credential: CredentialSerializer = await this.storage.get(this.CREDENTIAL);
    return credential;
  }
}
