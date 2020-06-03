import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CredentialSerializer } from 'src/app/serializers/credential-serializer';
import { AcceptanceService } from 'src/app/services/acceptance.service';
import { ActivatedRoute } from '@angular/router';
import { AcceptanceSerializer } from 'src/app/serializers/acceptance-serializer';
import { ItemPaginateSerializer } from 'src/app/serializers/item-serializer';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-acceptance-detail',
  templateUrl: './acceptance-detail.page.html',
  styleUrls: ['./acceptance-detail.page.scss'],
})
export class AcceptanceDetailPage implements OnInit {
  protected acceptance: AcceptanceSerializer = new AcceptanceSerializer();
  protected items: ItemPaginateSerializer = new ItemPaginateSerializer();

  constructor(
    private storage: Storage,
    private acceptanceService: AcceptanceService,
    private activatedRoute: ActivatedRoute,
    private itemService: ItemService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.get();
  }

  async get() {
    const credential: CredentialSerializer = await this.storage.get('credential');
    const id = this.activatedRoute.snapshot.params['id'];
    this.acceptanceService.get(credential, id).subscribe(
      (response) => {
        this.acceptance = response;
        this.filterItem(this.acceptance);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async filterItem(acceptance: AcceptanceSerializer) {
    const credential: CredentialSerializer = await this.storage.get('credential');
    this.itemService.filter(credential, acceptance).subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
