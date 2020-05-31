import { Component, OnInit } from '@angular/core';
import { ProductSerializer } from 'src/app/serializers/product-serializer';
import { Storage } from '@ionic/storage';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.page.html',
  styleUrls: ['./product-create.page.scss'],
})
export class ProductCreatePage implements OnInit {
  private product: ProductSerializer;
  constructor(
    private storage: Storage,
    private productService: ProductService,
    private router: Router
  ) {
    this.product = new ProductSerializer();
  }

  ngOnInit() {  
    this.getNumber();
  }

  async getNumber() {
    const credential = await this.storage.get('credential');
    this.productService.getNumber(credential).subscribe(
      (response) => {
        this.product.product_number = response.number;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  async create() {
    const credential = await this.storage.get('credential');
    this.productService.create(credential, this.product).subscribe(
      (response) => {
        this.router.navigate(['product-list']);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
