import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.component.html',
  styleUrls: ['./cart-counter.component.scss'],
})
export class CartCounterComponent implements OnInit {
  private totalCart: number;
  constructor(
    private storage: Storage,
    private cartService: CartService
  ) {
    this.totalCart = this.cartService.getTotal();
  }

  ngOnInit() {

  }

}
