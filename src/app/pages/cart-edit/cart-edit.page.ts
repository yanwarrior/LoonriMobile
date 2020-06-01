import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartSerializer } from 'src/app/serializers/cart-serializer';

@Component({
  selector: 'app-cart-edit',
  templateUrl: './cart-edit.page.html',
  styleUrls: ['./cart-edit.page.scss'],
})
export class CartEditPage implements OnInit {
  private cart: CartSerializer = new CartSerializer();

  constructor(
    private storage: Storage,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.get();
  }

  ngOnInit() {
  }

  async get() {
    const credential = await this.storage.get('credential');
    const id: number = this.activatedRoute.snapshot.params["id"];
    this.cartService.get(credential, id).subscribe(
      (response) => {
        this.cart = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async patch() {
    const credential = await this.storage.get('credential');
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.cartService.patch(credential, id, this.cart).subscribe(
      (response) => {
        this.router.navigate(['cart-list']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async delete() {
    const credential = await this.storage.get('credential');
    const id: number = this.activatedRoute.snapshot.params['id'];
    this.cartService.delete(credential, id).subscribe(
      (response) => {
        this.router.navigate(['cart-list']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
