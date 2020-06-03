import { Component, OnInit } from '@angular/core';
import { CredentialSerializer } from 'src/app/serializers/credential-serializer';
import { ProductService } from 'src/app/services/product.service';
import { ProductPaginateSerializer } from 'src/app/serializers/product-paginate-serializer';
import { Storage } from '@ionic/storage';
import { CartService } from 'src/app/services/cart.service';
import { ProductSerializer } from 'src/app/serializers/product-serializer';
import { CartAddSerializer } from 'src/app/serializers/cart-add-serializer';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-etalase',
  templateUrl: './etalase.page.html',
  styleUrls: ['./etalase.page.scss'],
})
export class EtalasePage implements OnInit {

  private products: ProductPaginateSerializer;
  private cart: CartAddSerializer = new CartAddSerializer();
  private searchBar: boolean = false;

  constructor(
    private productService: ProductService,
    private storage: Storage,
    private cartService: CartService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.all();
  }

  ionViewWillEnter() {
    this.all();
    this.cartService.total();
  }

  showSearchBar() {
    this.searchBar = true;
  }

  hideSearchBar() {
    this.searchBar = false;
  }

  toggleSearchBar() {
    this.searchBar = !this.searchBar;
  }

  async all() {
    let credential: CredentialSerializer = await this.storage.get('credential');
    this.productService.all(credential).subscribe(
      (response) => {
        this.products = response;
        console.log(this.products);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async search(e) {
    // if (e.detail.value && e.detail.value.trim() !== '') {
    
    let credential: CredentialSerializer = await this.storage.get('credential');
    this.productService.search(credential, e.detail.value).subscribe(
      (response) => {
        this.products = response
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async cursor(e, url: string) {
    let credential: CredentialSerializer = await this.storage.get('credential');
    this.productService.cursor(credential, url).subscribe(
      (response) => {
        if (response.count > 0) {
          const data = [...this.products.results, ...response.results];
          this.products = response;
          this.products.results = data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async add(product: ProductSerializer) {
    this.cart.product = product.id;
    const credential: CredentialSerializer = await this.storage.get('credential');
    this.cartService.add(credential, this.cart).subscribe(
      async (response) => {
        const toast = await this.toastController.create({
          message: 'Layanan berhasil ditambahkan ke keranjang.',
          duration: 300,
        });
        toast.present();
        this.cartService.total();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
