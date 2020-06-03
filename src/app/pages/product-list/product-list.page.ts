import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CredentialSerializer } from 'src/app/serializers/credential-serializer';
import { ProductPaginateSerializer } from 'src/app/serializers/product-paginate-serializer';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  private products: ProductPaginateSerializer;
  private searchBar: boolean = false;

  constructor(
    private productService: ProductService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.all();
  }

  ionViewWillEnter() {
    this.all();
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

}
