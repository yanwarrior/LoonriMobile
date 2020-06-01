import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent implements OnInit {

  constructor(
    private storage: Storage,
    private cartService: CartService
  ) { }

  ngOnInit() {}

}
