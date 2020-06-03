import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/services/cart.service';
import { CredentialSerializer } from 'src/app/serializers/credential-serializer';
import { CartPaginateSerializer } from 'src/app/serializers/cart-serializer';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.page.html',
  styleUrls: ['./cart-list.page.scss'],
})
export class CartListPage implements OnInit {
  private carts: CartPaginateSerializer = new CartPaginateSerializer();

  constructor(
    private storage: Storage,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.all();
  }

  ionViewWillEnter() {
    this.cartService.total();
    this.all();
  }

  async all() {
    const credential: CredentialSerializer = await this.storage.get('credential');
    this.cartService.all(credential).subscribe(
      (response) => {
        this.carts = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
