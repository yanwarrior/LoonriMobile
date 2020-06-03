import { Component, OnInit } from '@angular/core';
import { AcceptancePaginateSerializer, AcceptanceSerializer } from 'src/app/serializers/acceptance-serializer';
import { AcceptanceService } from 'src/app/services/acceptance.service';
import { Storage } from '@ionic/storage';
import { CredentialSerializer } from 'src/app/serializers/credential-serializer';
import { SMS } from '@ionic-native/sms/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-acceptance-list',
  templateUrl: './acceptance-list.page.html',
  styleUrls: ['./acceptance-list.page.scss'],
})
export class AcceptanceListPage implements OnInit {
  protected acceptances: AcceptancePaginateSerializer = new AcceptancePaginateSerializer();
  protected searchBar: boolean = false;
  protected status: string = 'WASHED';

  constructor(
    private acceptanceService: AcceptanceService,
    private storage: Storage,
    private sms: SMS,
    private toastController: ToastController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.filter();
  }

  showSearchBar() {
    this.searchBar = true;
  }

  hideSearchBar() {
    this.searchBar = false;
  }

  segmentChanged(event) {
    this.status = event.detail.value;
    this.filter();
  }

  async filter() {
    const credential: CredentialSerializer = await this.storage.get('credential');
    this.acceptanceService.filter(credential, this.status).subscribe(
      (response) => {
        this.acceptances = response;
        this.hideSearchBar();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async search(e) {
    let credential: CredentialSerializer = await this.storage.get('credential');
    this.acceptanceService.search(credential, e.detail.value, this.status).subscribe(
      (response) => {
        console.log(response);
        this.acceptances = response
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async completed(acceptance: AcceptanceSerializer) {
    const credential: CredentialSerializer = await this.storage.get('credential');
    this.acceptanceService.completed(credential, acceptance.id).subscribe(
      async (response) => {
        const toast = await this.toastController.create({
          message: 'Transaction status successfully changed to complete',
          duration: 2000
        });
        toast.present();
        this.filter();
        this.sendSMS(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async taked(acceptance: AcceptanceSerializer) {
    const credential: CredentialSerializer = await this.storage.get('credential');
    this.acceptanceService.taked(credential, acceptance.id).subscribe(
      async (response) => {
        const toast = await this.toastController.create({
          message: 'Transaction status successfully changed to take',
          duration: 2000
        });
        toast.present();
        this.sendSMS(response);
        this.filter();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async cursor(e, url: string) {
    let credential: CredentialSerializer = await this.storage.get('credential');
    this.acceptanceService.cursor(credential, url).subscribe(
      (response) => {
        if (response.count > 0) {
          const data = [...this.acceptances.results, ...response.results];
          this.acceptances = response;
          this.acceptances.results = data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sendSMS(acceptance: AcceptanceSerializer): void{
    const message: string = `Halo ${acceptance.customer_name}. Cucian Anda "${acceptance.acceptance_number}" saat ini "${acceptance.attr_status}"`
    this.sms.send(acceptance.customer_phone, message)
      .then(async () => {
        const toast = await this.toastController.create({
          message: 'Message sent to the customer',
          duration: 2000
        })
        toast.present();
      })
      .catch(async () => {
        const toast = await this.toastController.create({
          message: 'An error occurred while sending the message. Make sure you have enough credit!',
          duration: 2000
        });
        toast.present();
      })
  }

}
