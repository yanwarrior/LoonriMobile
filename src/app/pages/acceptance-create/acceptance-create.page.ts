import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { AcceptanceService } from 'src/app/services/acceptance.service';
import { Router } from '@angular/router';
import { AcceptanceSerializer } from 'src/app/serializers/acceptance-serializer';
import { CartService } from 'src/app/services/cart.service';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-acceptance-create',
  templateUrl: './acceptance-create.page.html',
  styleUrls: ['./acceptance-create.page.scss'],
})
export class AcceptanceCreatePage implements OnInit {
  private acceptance: AcceptanceSerializer = new AcceptanceSerializer();

  constructor(
    private storage: Storage,
    private acceptanceService: AcceptanceService,
    private router: Router,
    private cartService: CartService,
    private sms: SMS
  ) { }

  ngOnInit() {
    this.getNumber();
  }

  async getNumber() {
    const credential = await this.storage.get('credential');
    this.acceptanceService.getNumber(credential).subscribe(
      (response) => {
        this.acceptance.acceptance_number = response.number;
        this.acceptance.residual = this.cartService.getSummary().total;
        this.acceptance.total = this.cartService.getSummary().total;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  calculateResidual() {
    setTimeout(() => {
      if (this.acceptance.down_payment) {
        this.acceptance.residual = this.acceptance.total - this.acceptance.down_payment;
      }
    }, 500);
  }

  async create() {
    const credential = await this.storage.get('credential');
    this.acceptance.acceptance_date = moment(this.acceptance.acceptance_date).format('YYYY-MM-DD');
    this.acceptanceService.create(credential, this.acceptance).subscribe(
      (response) => {
        this.acceptanceService.cartToItem(credential, response.id).subscribe(
          async (response) => {
            this.sendSMS(response).then(() => {
              this.router.navigate(['etalase']);
            })
          },
          (error) => {
            console.log(error);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async sendSMS(acceptance: AcceptanceSerializer) {
    const message: string = `
      Halo ${acceptance.customer_name}. \n
      ${acceptance.acceptance_number} adalah nomer transaksi cucian Anda. \n
      Harap disimpan dengan baik untuk mengambil cucian nanti!`;
    await this.sms.send(acceptance.customer_phone, message);
  }
}
